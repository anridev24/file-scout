// External crates imports
use indicatif::{ProgressBar, ProgressStyle};
use rayon::prelude::*;
use serde::{Deserialize, Serialize};
use tauri::Window;

// Standard library imports
use std::{
    collections::HashMap,
    fs,
    path::{Path, PathBuf},
    sync::{
        atomic::{AtomicUsize, Ordering},
        mpsc::channel,
        Arc, Mutex,
    },
    time::{Duration, Instant},
};

// Internal modules imports
use crate::emit_event::{emit_event, EventName};

#[derive(Serialize, Deserialize)]
pub struct IgnoredItems {
    items: HashMap<String, bool>,
}

fn build_tree(dir: &Path, files: &mut Vec<PathBuf>, ignored_items: &IgnoredItems) {
    // Access the HashMap from the ignored_items reference
    let items = &ignored_items.items;

    // Check if the directory name is a key in the ignored items map
    if let Some(file_name) = dir.file_name().and_then(|name| name.to_str()) {
        if items.contains_key(file_name) {
            return;
        }
    }

    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.filter_map(Result::ok) {
            let path = entry.path();
            if path.is_symlink() {
                continue;
            }
            if path.is_dir() {
                // Pass the reference to ignored_items to the recursive call
                build_tree(&path, files, ignored_items);
            } else {
                // Check if the file name is a key in the ignored items map
                if let Some(file_name) = path.file_name().and_then(|name| name.to_str()) {
                    if !items.contains_key(file_name) {
                        files.push(path);
                    }
                }
            }
        }
    }
}

pub fn search_files(
    window: &Window,
    search_term: &str,
    projects_path: &PathBuf,
    ignored_items: &IgnoredItems,
) -> Vec<PathBuf> {
    let mut file_tree = Vec::new();

    // Prepare for parallel processing
    let (sender, receiver) = channel();

    println!("Reading tree");
    emit_event(
        &window,
        EventName::StatusBuildingTree,
        serde_json::json!({}),
    );

    build_tree(projects_path, &mut file_tree, ignored_items);

    let total_files = file_tree.len();
    println!("Number of files: {}", total_files);

    let progress_bar = ProgressBar::new(file_tree.len() as u64);
    progress_bar.set_style(
        ProgressStyle::default_bar()
            .template(
                "{spinner:.green} [{elapsed_precise}] [{wide_bar:.cyan/blue}] {pos}/{len} ({eta})",
            )
            .expect("Invalid progress bar template") // Handle the Result from .template()
            .progress_chars("#>-"), // Now correctly applies on ProgressStyle
    );

    let processed_files_count = Arc::new(AtomicUsize::new(0));
    let last_emit_time = Arc::new(Mutex::new(Instant::now()));

    file_tree
        .par_iter()
        .enumerate()
        .for_each_with(sender, |s, (index, file)| {
            let current_count = processed_files_count.fetch_add(1, Ordering::SeqCst) + 1;
            progress_bar.inc(1);

            let now = Instant::now();
            let mut last_emit = last_emit_time.lock().unwrap();
            if now.duration_since(*last_emit) >= Duration::from_millis(1000)
                || index == total_files - 1
            {
                emit_event(
                    window,
                    EventName::StatusSearching,
                    serde_json::json!({
                        "total": total_files,
                        "current": current_count,
                    }),
                );
                *last_emit = now;
            }
            drop(last_emit); // Explicitly release the lock

            // Simulate file processing (e.g., checking if the file contains the search term)
            if let Ok(contents) = fs::read_to_string(file) {
                if contents.contains(search_term) {
                    s.send(file.clone()).expect("Failed to send file path");
                }
            }
        });

    // Collect all matching file paths
    let results: Vec<PathBuf> = receiver.iter().collect();

    // Ensure a final update is sent if not already done in the last iteration
    let final_count = processed_files_count.load(Ordering::SeqCst);
    if final_count == total_files {
        emit_event(
            window,
            EventName::StatusSearching,
            serde_json::json!({
                "total": total_files,
                "current": final_count,
            }),
        );
    }

    progress_bar.finish_with_message("Done searching files");

    emit_event(window, EventName::StatusIdle, serde_json::json!({}));

    // Log all found results
    if !results.is_empty() {
        println!("\n--- Found Results ---");
        for result in &results {
            println!("{}", result.display());
        }
        println!("--- End of Results ---");
    } else {
        println!("\nNo results found.");
    }

    results
}
