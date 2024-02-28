use crate::file_search::{search_files, IgnoredItems};
use serde::Serialize;
use std::path::PathBuf;
use tauri::command;
use tauri::Window;
use tokio::task; // Assuming file_search is another module

#[derive(Debug, Serialize)]
pub struct SearchError {
    message: String,
}

impl SearchError {
    pub fn new(message: &str) -> Self {
        Self {
            message: message.to_owned(),
        }
    }
}

#[command]
pub async fn start_search(
    window: Window,
    path: String,
    search_term: String,
    ignored_items: IgnoredItems,
) -> Result<Vec<String>, SearchError> {
    println!("Path selected: {}", &path);
    let project_path = PathBuf::from(&path);

    let search_results = task::spawn_blocking(move || {
        search_files(&window, &search_term, &project_path, &ignored_items)
    })
    .await
    .map_err(|e| SearchError::new(&e.to_string()))?;

    let results: Vec<String> = search_results
        .into_iter()
        .map(|path_buf| {
            path_buf
                .into_os_string()
                .into_string()
                .unwrap_or_else(|_| "Invalid path".to_string())
        })
        .collect();

    Ok(results)
}
