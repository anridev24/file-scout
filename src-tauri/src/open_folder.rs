use std::process::Command;

pub fn open_folder(path: &str) {
    #[cfg(target_os = "windows")]
    Command::new("explorer")
        .args(&["/select,", path])
        .spawn()
        .expect("Failed to open and select file on Windows.");
}
