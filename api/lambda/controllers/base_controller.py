from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class BaseController():
  def __init__(self) -> None:
    engine = create_engine('')# agregar cadena de conexion
    Session = sessionmaker(bind=engine)
    self.session = Session()
    self.engine = engine