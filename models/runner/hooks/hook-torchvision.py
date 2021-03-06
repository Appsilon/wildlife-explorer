from PyInstaller.utils.hooks import get_package_paths
from PyInstaller.compat import is_win

datas = [
    (get_package_paths('torchvision')[1], "site-packages/torchvision"),
    (get_package_paths('torchvision')[1], "torchvision"),
    (get_package_paths('torch')[1], "site-packages/torch"),
    (get_package_paths('torch')[1], "torch")
] + (
    [(get_package_paths('mkl_fft')[1], "site-packages/mkl_fft"),
     (get_package_paths('mkl_fft')[1], "mkl_fft")] if is_win else [])
