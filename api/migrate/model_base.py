from sqlalchemy.orm import declarative_base
import datetime
Base = declarative_base()

def convert_datetime_to_string(dictionary):
  for key, value in dictionary.items():
    if isinstance(value, datetime.datetime):
      dictionary[key] = value.strftime('%Y-%m-%d %H:%M:%S')
  return dictionary

class ModelBase(Base):
  __abstract__ = True
  def to_dict(self):
    response = {field.name:getattr(self, field.name) for field in self.__table__.c}
    converted_dict = convert_datetime_to_string(response)
    return converted_dict
