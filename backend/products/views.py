from django.http import JsonResponse
from products import helper


def get_products(request):
    if request.method != 'GET':
        return

    keyword = request.GET['keyword']
    price_start = request.GET['priceStart']
    price_end = request.GET['priceEnd']
    category = request.GET['category']
    if request.GET['isUsed'] == 'false':
        is_used = False
    else:
        is_used = True

    products = helper.get_all_products(keyword, (price_start, price_end), is_used)
    products = helper.filter_products(keyword, (price_start, price_end), category, products)
    return JsonResponse(products, safe=False)
