import requests
import tkinter as tk
from tkinter import Label, Button
from PIL import Image, ImageTk
from io import BytesIO

API_KEY = 'live_qkr8Ygbh7g7mprh23SZ1dNJbxbV13ETAVCizkGvro8zezBk25WlDobi7ny1nAM55'  # 실제 API 키로 교체

def get_cat_data():
    try:
        params = {'api_key': API_KEY}
        response = requests.get('https://api.thecatapi.com/v1/images/search', params=params)
        response.raise_for_status()
        cat_data = response.json()[0]
        image_url = cat_data['url']

        breed_info = "Unknown Breed"
        description = "No description available."
        origin = "Unknown"
        life_span = "Unknown"

        if cat_data.get('breeds'):
            breed = cat_data['breeds'][0]
            breed_info = breed.get('name', "Unknown Breed")
            description = breed.get('description', "No description available.")
            origin = breed.get('origin', "Unknown")
            life_span = breed.get('life_span', "Unknown")
        else:
            breed_response = requests.get(f'https://api.thecatapi.com/v1/breeds', params=params)
            breed_response.raise_for_status()
            breeds = breed_response.json()
            if breeds:
                random_breed = breeds[0]
                breed_info = random_breed.get('name', "Unknown Breed")
                description = random_breed.get('description', "No description available.")
                origin = random_breed.get('origin', "Unknown")
                life_span = random_breed.get('life_span', "Unknown")

        return image_url, breed_info, description, origin, life_span
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return None, None, None, None, None

def update_gui():
    image_url, breed_info, description, origin, life_span = get_cat_data()
    if image_url:
        response = requests.get(image_url)
        image_data = Image.open(BytesIO(response.content))
        image_data = image_data.resize((300, 300))
        img = ImageTk.PhotoImage(image_data)

        cat_image_label.config(image=img)
        cat_image_label.image = img
        breed_label.config(text=f"Breed: {breed_info}")
        description_label.config(text=f"Description: {description}")
        origin_label.config(text=f"Origin: {origin}")
        life_span_label.config(text=f"Life Span: {life_span}")

root = tk.Tk()
root.title("Random Cat Info")

cat_image_label = Label(root)
cat_image_label.pack()

breed_label = Label(root, text="Breed: ", font=("Arial", 14))
breed_label.pack()

description_label = Label(root, text="description: ", wraplength=400, justify="left", font=("Arial", 12))
description_label.pack()

origin_label = Label(root, text="Origin: ", font=("Arial", 12))
origin_label.pack()

life_span_label = Label(root, text="Life Span: ", font=("Arial", 12))
life_span_label.pack()

get_cat_button = Button(root, text="Get Random Cat", command=update_gui, font=("Arial", 14))
get_cat_button.pack()

root.mainloop()

# description으로 변경함 