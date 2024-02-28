use std::process::Command;

pub fn open_folder(path: &str) {
    #[cfg(target_os = "windows")]
    Command::new("explorer")
        .arg(path)
        .spawn()
        .expect("Failed to open path on Windows.");
}
