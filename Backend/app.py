from flask import Flask, request, send_file
from pdf2docx import Converter
import os

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_pdf_to_docx():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400

    if file and file.filename.endswith('.pdf'):
        input_path = 'input.pdf'
        output_path = 'output.docx'
        file.save(input_path)

        # Convert PDF to DOCX
        cv = Converter(input_path)
        cv.convert(output_path, start=0, end=None)
        cv.close()

        # Clean up
        os.remove(input_path)

        return send_file(output_path, as_attachment=True)

    return 'Invalid file format', 400

if __name__ == '__main__':
    app.run(debug=True)
