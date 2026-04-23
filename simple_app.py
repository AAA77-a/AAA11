import streamlit as st
import sys
import os

# 显示系统信息
st.title("简单测试应用")
st.write("Hello, Streamlit!")
st.write(f"Python version: {sys.version}")
st.write(f"Streamlit version: {st.__version__}")
st.write(f"Current directory: {os.getcwd()}")

# 显示一些数据
import pandas as pd
import numpy as np

data = pd.DataFrame({
    'col1': [1, 2, 3, 4, 5],
    'col2': [10, 20, 30, 40, 50]
})
st.write("Sample DataFrame:")
st.dataframe(data)
