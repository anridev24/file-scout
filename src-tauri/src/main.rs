// This attribute configures the application to not show a console window in release builds on Windows
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::command;
use tauri::Window;

// Internal modules
mod emit_event;
mod file_search;
mod open_file;
mod open_folder;
mod start_search;

use crate::open_file::open_file;
use crate::open_folder::open_folder;
use crate::start_search::start_search;

#[command]
fn open_file_rust(_window: Window, path: &str) {
    open_file(&path)
}

#[command]
fn open_folder_rust(_window: Window, path: &str) {
    open_folder(&path)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_search,
            open_file_rust,
            open_folder_rust
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
