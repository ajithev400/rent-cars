from twilio.rest import Client
from django.conf import settings


def send_otp(mobile):
    number = '+91'+str(mobile)
    account_sid = settings.ACCOUNT_SID
    auth_token = settings.AUTH_TOKEN
    service_id = settings.SERVICES_ID
    client = Client(account_sid, auth_token)

    verification = client.verify \
                        .services(service_id) \
                        .verifications \
                        .create(to= number , channel='sms')

    print(verification.status)
    return(verification.status)



def verify_otp(mobile,otp):
    number = '+91'+str(mobile)
    account_sid = settings.ACCOUNT_SID
    auth_token = settings.AUTH_TOKEN
    service_id = settings.SERVICES_ID
    client = Client(account_sid, auth_token)

    verification_check = client.verify \
                            .services(service_id) \
                            .verification_checks \
                            .create(to=number, code=otp)

    print(verification_check.status)
    
    if verification_check.status == 'approved':
        print('Verification Conform')
        return True
    else:
        return False