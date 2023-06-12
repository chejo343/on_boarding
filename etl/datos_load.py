import pandas as pd
import requests
URL = 'https://wx82dtso63.execute-api.us-east-1.amazonaws.com/v1/api'

df_plazas = pd.read_csv('./Puestos.csv', sep=';')
for idx, row in df_plazas.iterrows():
  r = requests.post(f'{URL}/puestos', json={
    'Nombre': row['Nombre'],
    'Descripcion': row['Nombre'],
    'UsuarioCreo': '1702602240923'
  })

df_empleados = pd.read_csv('./Empleados.csv', sep=';', dtype={'DPI': str, 'Telefono': str})
df_empleados['Nombres'] = df_empleados['Nombres'].str.strip()
df_empleados['Apellidos'] = df_empleados['Apellidos'].str.strip()
df_empleados['Apellidos'] = df_empleados['Apellidos'].str.strip()
df_empleados['Email'] = df_empleados['Email'].str.strip()
for idx, row in df_empleados.iterrows():
  r = requests.post(f'{URL}/empleados', json={
    'Nombre': row['Nombres'],
    'Apellido': row['Apellidos'],
    'Telefono': row['Telefono'],
    'DPI': row['DPI'],
    'Email': row['Email'],
    'IdPuesto': row['PlazaId'],
    'UsuarioCreo': '1702602240923'
  })