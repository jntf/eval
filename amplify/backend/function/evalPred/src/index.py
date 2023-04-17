import json

def handler(event, context):
    # Replace only for the test
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

    vehicle = make + ' ' + model + ' ' + str(year) + ' ' + str(mileage) + ' ' + transmission + ' ' + energies + ' ' + keywords
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(
            {
                'make': make,
                'model': model,
                'year': year,
                'mileage': mileage,
                'transmission': transmission,
                'energies': energies,
                'keywords': keywords,
                'vehicle': vehicle
            }
        ),
    }