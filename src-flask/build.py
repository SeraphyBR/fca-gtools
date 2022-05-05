import PyInstaller.__main__

PyInstaller.__main__.run([
    'main.py',
    '--onefile',
    '--add-binary', 'fcatools/d-peeler/d-peeler:.'
])
