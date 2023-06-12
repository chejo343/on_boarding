# Migraciones
Los archivos de esta carpeta sirven para generar las migraciones y actualizar la base de datos
```
flask db migrate -m "mensaje"
flask db upgrade
```
Los modelos se deben poner en la carpeta `models` e importarlos en el archivo `__init__.py`