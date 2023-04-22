import json
import pickle
import re
import pandas as pd
import numpy as np
import boto3

s3 = boto3.client('s3')

# def clean_version(x):
#     stopword = ['cv', ' ', '', '5p', '-', '.', '|', '+', '+options', 'options', 'option', 'opt', 'brand', 'model', 'energy', 'gear', 'kms', 'version', 's&s']
#     version = x.lower().split(' ')
#     version = [word.replace('cv', '').replace('.', '') for word in version if word not in stopword]
#     for v in version:
#         if re.search(r'\d', v):
#             version[version.index(v)] = v.replace('ch', '')
#     return ' '.join(version)
# def predict_price_with_model(car, pkl_model, plk_vectorizer, plk_sc):
#     car = pd.DataFrame(car, index=[0])
#     car.version = car.version.apply(clean_version)
#     car.brand = car.brand.apply(lambda x: x.lower())
#     car.model = car.model.apply(lambda x: x.lower())
#     car['title'] = car.brand + ' ' + car.model + ' ' + car.version
#     car = car.drop(columns=['brand', 'model', 'version'])
#     car.title = car.title.apply(lambda x: ' '.join(sorted(set(x.split(' ')))))
#     X_text = plk_vectorizer.transform(car.title)
#     X_num = car.drop(columns=['title']).values
#     X = plk_sc.fit_transform(X_num)
#     X = np.concatenate((X_text.toarray(), X_num), axis=1)
#     return pkl_model.predict(X)

def handler(event, context):
    print(event)
    print("XXXXXXXXXXXXXX")
    body = json.loads(event['body'].replace("'", '"'))

    make = body['make']
    model = body['model']
    year = body['year']
    mileage = body['kms']
    try:
        transmission = body['transmissions']
    except: 
        transmission = ''
    try:
        energies = body['energies']
    except: 
        energies = ''
    try:
        keywords = body['keywords']
        keywords = [i for i in keywords[0].values()]
        keywords = ' '.join(keywords)
    except: 
        keywords = ''

    pkl_model = pickle.loads(s3.get_object(Bucket='eval-models', Key=f'{make}/model.pkl')['Body'].read())
    print("pkl_model")
    plk_vectorizer = pickle.loads(s3.get_object(Bucket='eval-models', Key=f'{make}/vectorizer.pkl')['Body'].read())
    print("plk_vectorizer")
    plk_sc = pickle.loads(s3.get_object(Bucket='eval-models', Key=f'{make}/scaler.pkl')['Body'].read())
    print("plk_sc")

    car = {
        'brand': make,
        'model': model,
        'version': f'{transmission} {energies} {keywords}',
        'kms': mileage,
        'registry_year': year
    }

    vehicle = make + ' ' + model + ' ' + f'{transmission} {energies} {keywords}' + ' ' + str(mileage) + ' ' + str(year)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(vehicle),
    }