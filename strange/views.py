
from strange.models import Location
from django.utils.simplejson as json

def index(request):
    return render_to_response('strange/index.html', {}, context=RequestContext(request))

def locations(request):
    if request.method == 'POST':
        return HttpResponse('ok')
    else:
        locations = Location.objects.all()
        return HttpResponse()
       
def closest(request):
    pass

def accurate(request):
    pass

def within(request):
    request.POST['area']

def robots(request):
    return HttpResponse('User-agent: *\nDisallow: /')
