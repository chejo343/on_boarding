# Lambda para manejo de datos
## Dependencias para lambda
Python 3.8
```
pip install --target ./package/python shortuuid cerberus SQLAlchemy pymysql flask_sqlalchemy pandas
```
## Exportar paquete layer zip
```powershell
Compress-Archive -Path ./package/* -DestinationPath ./package.zip -Force
```
## Exportar paquete zip
Este script se encarga de empaquetar el codigo para ser subido a la lambda correspontiente
```powershell
Compress-Archive -Path ./lambda_function.py,./validators/*,./controllers/*,./handlers/*,../migrate/models/*,../migrate/db.py,../migrate/model_base.py -DestinationPath ./lambda.zip -Force
```
## API gateway
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