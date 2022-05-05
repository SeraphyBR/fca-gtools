# -*- coding: utf-8 -*-
import sys
import os
sys.path.append(".")  # sets fcatools as a python path

EMPTY_VALUE = 'ø'


def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(
        os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)
