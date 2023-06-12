# On Board APP
## Descripción
Este repositorio contiene los archivos y scripts relacionados con un proyecto que se divide en tres directorios principales: ETL, Frontend y API. Cada directorio tiene un propósito específico en el contexto del proyecto.

## etl
El directorio ETL contiene los scripts necesarios para realizar las tareas de extracción, transformación y carga de datos. Estos scripts son responsables de obtener los datos desde sus fuentes, aplicar las transformaciones necesarias y cargarlos en una base de datos.
### Tecnologias usadas
* pandas
* SQLAlchemy
* requests

## frontend
En el directorio Frontend se encuentran los archivos relacionados con el cliente web desarrollado con React. Se utiliza el framework Material-UI para la interfaz de usuario y se implementa Redux para la gestión del estado de la aplicación. Esta parte del proyecto se encarga de la visualización de los datos y la interacción con el usuario.
### Tecnologias usadas
* React
* VITE
* easy-peasy (REDUX)
* mui (Material UI)
* axios
### Instalacion
```
npm install
```
## api
El directorio API contiene la implementación de la API desarrollada en Python utilizando AWS Lambda y API Gateway. Se utiliza el ORM SQLAlchemy para interactuar con la base de datos MySQL. Esta API proporciona un punto de acceso para acceder y manipular los datos almacenados en la base de datos.

Además, en el desarrollo de la API también se hace uso de la biblioteca Pandas para leer y manipular datos de manera eficiente.

Para el despliegue en AWS Lambda se tuvo que crear una layer para el manejo de las dependencias necesarias
### Tecnologias usadas
* Python
* SQLAlchemy
* pandas
* cerberus (validacion de modelos)
* flask_sqlalchemy
* flask_migrate (migracion de modelos a DB)
* anaconda (manejo de entornos virtuales)
* ubuntu (exportar depentencias para layer)
### Dependencias para lambda
Python 3.8
```
pip install --target ./package/python shortuuid cerberus SQLAlchemy pymysql flask_sqlalchemy pandas
```
### Exportar paquete layer zip
```powershell
Compress-Archive -Path ./package/* -DestinationPath ./package.zip -Force
```
### Exportar paquete zip
Este script se encarga de empaquetar el codigo para ser subido a la lambda correspontiente
```powershell
Compress-Archive -Path ./lambda_function.py,./validators/*,./controllers/*,./handlers/*,../migrate/models/*,../migrate/db.py,../migrate/model_base.py -DestinationPath ./lambda.zip -Force
```
### API gateway
```
/api
  /{recurso}
  -GET
  -POST
    /{param}
    -GET
    -PUT
    -DELETE
```
#### Request mapping template
```
{
  "method": "$context.httpMethod",
  "body" : $input.json('$'),
  "headers": {
    #foreach($param in $input.params().header.keySet())
    "$param": "$util.escapeJavaScript($input.params().header.get($param))" #if($foreach.hasNext),#end

    #end
  },
  "queryParams": {
    #foreach($param in $input.params().querystring.keySet())
    "$param": "$util.escapeJavaScript($input.params().querystring.get($param))" #if($foreach.hasNext),#end

    #end
  },
  "pathParams": {
    #foreach($param in $input.params().path.keySet())
    "$param": "$util.escapeJavaScript($input.params().path.get($param))" #if($foreach.hasNext),#end

    #end
  }
}
```
## estadistica
Analisis exploratorio de los datos de asignacion de recursos
### Tecnologias usadas
* Python
* SQLAlchemy
* pandas
* matplotlib
* Jupyter notebook