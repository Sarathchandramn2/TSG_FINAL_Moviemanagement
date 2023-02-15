from models.Role import Role
import pymysql
from config import mydb
from flask import jsonify
from flask import request
from app import app

#Insert a Role to to Role Table
@app.route('/addRole', methods=['POST'])
def addRole(roleid=None):
    try:
         # Get the role data from the request body
        json = request.json
        role = json['role']
        # Create a new Role object using the role data
        roleobj = Role(roleid, role)
        if role and request.method == 'POST' :
            conn = mydb.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            # Insert the new role into the role table
            sqlQuery = "INSERT INTO role(role) VALUES( %s)"
            bindData = roleobj.role
            cursor.execute(sqlQuery,bindData)
            conn.commit()
            # Return a response indicating the role was added successfully
            response = jsonify('Role is added successfully')
            response.status_code = 200
            return response
        else:
            return "something went wrong"
    except KeyError:
        return jsonify('key error, one value is missing')
