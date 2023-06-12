import pandas as pd
from sqlalchemy import create_engine
engine = create_engine('')

query_empleados = '''
SELECT ps.Nombres, ps.Apellidos, ps.Telefono1 AS Telefono, ps.DPI, ps.Email, pl.Nombre AS Plaza, pl.PlazaId
  FROM Postulantes AS ps
  INNER JOIN Postulacions AS pt ON ps.PostulanteId = pt.PostulanteId
  INNER JOIN Convocatorias AS cv ON pt.ConvocatoriaId = cv.ConvocatoriaId
  INNER JOIN Plazas AS pl ON cv.PlazaId = pl.PlazaId
  WHERE ps.Status = 1 AND pt.IsContratado = 1
'''
df_empleados = pd.read_sql_query(query_empleados, engine)

query_puestos = '''
SELECT Nombre AS Plaza, PlazaId FROM Plazas
  WHERE Status = 1
'''
df_plazas = pd.read_sql_query(query_puestos, engine)

df_empleados.to_csv('./Empleados.csv', index=False, sep=';')
df_plazas.to_csv('./Puestos.csv', index=False, sep=';')
