# Лабораторная работа №2: Работа с JavaScript и API
В данной работе я создал генератор особой формы объекта [Imagemap](https://w3schoolsua.github.io/html/html_images_imagemap_en.html#gsc.tab=0) предназначенного для сайта osu.ppy.sh
То, как работает Imagemap описано ниже вместе с видео работы веб-приложения

Пункт лабораторной работы: Обработка действий пользователя

###

## Imagemap Generator for osu!

This is the web application to generate imagemaps for osu-web.

## How to use it:

https://github.com/Dopaminos/osu-imagemap-generator/assets/42616718/31d88128-8858-4464-8c10-0af20194376b

## Result of application's work:

https://github.com/Dopaminos/osu-imagemap-generator/assets/42616718/385422ea-4d5a-47c6-b872-7be9e850232d

### Documentation of Imagemap osu-web format from [osu!wiki](https://github.com/ppy/osu-wiki/blob/975aff50f053377e7582244f7276337fd13e56d0/wiki/BBCode/en.md) (line 252)

```
[imagemap]
IMAGE_URL
X Y WIDTH HEIGHT REDIRECT TITLE
[/imagemap]
```

The `[imagemap]` tag is used to integrate one or more hyperlinks into an image in rectangular areas.

The image, which is embedded on the website, is represented by the `IMAGE_URL` argument. It needs to directly refer to an image hosted on a website.

To add a clickable area, a new line containing the x and y position of the area, the width and the height of the area as well as a link to redirect to needs to be inserted after the `IMAGE_URL` argument. Additionally, an optional `TITLE` argument will be shown on hovering the area if it is specified. A link may be specified with the `REDIRECT` argument, or omitted with a `#`. Every size unit (`X`, `Y`, `WIDTH`, and `HEIGHT`) is a percentage (0–100) without a percent sign.

#


по сути это [мой старый проект](https://github.com/Dopaminos/osu-imagemap-generator) переписанный под тайпскрипт, 
дайте знать, если он не подходит под лабораторую работу