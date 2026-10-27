# AR-меню для кафе

Веб-приложение на HTML + JavaScript + Google model-viewer. Работает в браузере, без установки.

## Запуск локально
```
cd ar-menu
python -m http.server 8000
```
Откройте http://localhost:8000 (через file:// меню не загрузится из-за fetch).

## Свои модели блюд
1. Снимите блюдо в Polycam / Kiri Engine / Luma AI или смоделируйте в Blender.
2. Экспортируйте `.glb` (Android) и `.usdz` (iOS), положите в `models/`.
3. В `menu.json` замените `model_glb` (и при желании добавьте `model_usdz`). Сейчас в `models/` лежат упрощённые учебные модели, сгенерированные кодом. Если `model_usdz` не указан, model-viewer сам собирает версию для iPhone из GLB.
4. Фото блюд положите в `images/` (сейчас там превью-рендеры моделей).
5. Сожмите модели: `npx @gltf-transform/cli optimize in.glb out.glb --compress draco`

## Публикация
Залейте папку в репозиторий GitHub → Settings → Pages → ветка main. Затем вставьте ссылку в `make_qr.py` и запустите его.

## Важно
AR на телефоне работает только по HTTPS (GitHub Pages даёт его автоматически).
