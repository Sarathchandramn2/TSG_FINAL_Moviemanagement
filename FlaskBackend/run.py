from app import app
from services.admin.movie import *
from services.admin.Genre import *
from services.admin.Role import *
from services.user.users import *
from services.user.Rating import *


if __name__ == "__main__":  
     app.run(debug=True)