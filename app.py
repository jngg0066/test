import requests
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Serve the HTML page
@app.route('/subport')
def subport():
    return render_template('subport.html')

# Example API endpoints
API_ENDPOINTS = {
    'tab1': 'https://1qktndqm8l.execute-api.ap-southeast-2.amazonaws.com/prod2',
    'tab2': 'https://kbfoclo7dc.execute-api.ap-southeast-2.amazonaws.com/prod3',
    'tab3': 'https://uwvl29qlxg.execute-api.ap-southeast-2.amazonaws.com/prod5',
    'tab4': 'https://c3nn2v55vb.execute-api.ap-southeast-2.amazonaws.com/prod5'
}

# Handle AJAX requests
@app.route('/schools/<tab>/<suburb>')
def get_schools(tab, suburb):
    api_url = API_ENDPOINTS.get(tab)
    if not api_url:
        return jsonify({'error': 'Invalid tab'}), 400

    response = requests.get(api_url)
    if response.status_code == 200:
        schools = response.json()
        filtered_schools = [school for school in schools if school['Suburb'] == suburb]
        return jsonify(filtered_schools)
    else:
        return jsonify({'error': 'Failed to fetch data'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
