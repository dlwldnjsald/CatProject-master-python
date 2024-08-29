import requests
import tkinter as tk
from tkinter import Label, Button
from PIL import Image, ImageTk
from io import BytesIO

# The Cat API를 통해 랜덤 고양이 사진 및 정보 가져오기
def get_cat_data():
    try:
        # 랜덤 고양이 사진 가져오기
        response = requests.get('https://api.thecatapi.com/v1/images/search')
        response.raise_for_status()
        cat_data = response.json()[0]
        image_url = cat_data['url']

        # 고양이 품종 정보 가져오기
        breed_info = "Unknown Breed"
        temperament = "No description available."
        if cat_data.get('breeds'):
            breed_info = cat_data['breeds'][0]['name']
            temperament = cat_data['breeds'][0]['temperament']

        return image_url, breed_info, temperament
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return None, None, None

# GUI 업데이트 함수
def update_gui():
    image_url, breed_info, temperament = get_cat_data()
    if image_url:
        response = requests.get(image_url)
        image_data = Image.open(BytesIO(response.content))
        image_data = image_data.resize((300, 300))  # 이미지 크기를 300x300으로 조정
        img = ImageTk.PhotoImage(image_data)

        cat_image_label.config(image=img)
        cat_image_label.image = img
        breed_label.config(text=f"Breed: {breed_info}")
        temperament_label.config(text=f"Temperament: {temperament}")

# GUI 설정
root = tk.Tk()
root.title("Random Cat Info")

cat_image_label = Label(root)
cat_image_label.pack()

breed_label = Label(root, text="Breed: ", font=("Arial", 14))
breed_label.pack()

temperament_label = Label(root, text="Temperament: ", wraplength=400, justify="left", font=("Arial", 12))
temperament_label.pack()

get_cat_button = Button(root, text="Get Random Cat", command=update_gui, font=("Arial", 14))
get_cat_button.pack()

root.mainloop()
