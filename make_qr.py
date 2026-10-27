# pip install qrcode[pil]
import qrcode
URL = "https://ВАШ-ЛОГИН.github.io/ar-menu/"   # замените на свою ссылку
for table in range(1, 4):                        # столы 1-3
    qrcode.make(f"{URL}?table={table}").save(f"qr_table_{table}.png")
print("Готово")
