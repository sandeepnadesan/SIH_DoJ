import chatbot as cb
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/response', methods=['POST'])
def bot_response():
    try:
        user_message = request.json.get("message")
        if not user_message:
            return jsonify({"message": "Please Enter Text"}), 400 
        
        # print(f"User message: {user_message}")
        
        result = cb.response(user_message)
        
        return jsonify({"message": result}), 200  
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  

if __name__ == "__main__":
    app.run(debug=True)
