from bs4 import BeautifulSoup
import requests
import urllib3


def get_html(url, headers):
    """Gets url html as soup object."""
    page_content = requests.get(url, headers=headers).content
    soup = BeautifulSoup(page_content, 'html.parser')('body')[0]
    return soup


def clean_soup(soup):
    """Cleans soup object from any tags but body and removes all tag attributes."""
    # Remove script tag
    for tag in soup('script'):
        tag.decompose()

    # Remove style tag
    for tag in soup('style'):
        tag.decompose()


def get_products_amazon_with_country(keyword, country):
    """Gets a list of amazon products."""
    if country == 'us':
        url = 'https://www.amazon.com/s?k='
    else:
        url = 'https://www.amazon.co.uk/s?k='
    keyword = keyword.replace(' ', '+')
    url += keyword

    page = urllib3.PoolManager().request('GET', url).data
    soup = BeautifulSoup(page, 'html.parser')
    clean_soup(soup)

    # Extract data
    soup = soup.select('div[class="a-section a-spacing-medium"]', limit=20)

    products = []
    for product in soup:
        name = product.find('span', attrs={'class': 'a-size-medium a-color-base a-text-normal'}).text
        image_link = product.find('img')['src']
        buyers = product.find('span', attrs={'class': 'a-size-base'}).text
        if buyers == 'Sponsored':
            buyers = 0

        try:
            price = product.find('span', attrs={'class': 'a-offscreen'}).text
        except AttributeError:
            price = product.select('span[class="a-color-base"]')[0].text

        try:
            rate = product.find('span', attrs={'class': 'a-icon-alt'}).text
            rate = float(rate[0:3])
        except AttributeError:
            rate = 0

        if country == 'uk':
            website = 'amazonuk'
        else:
            website = 'amazonus'

        data = {
            'name': name,
            'link': '',
            'image_link': image_link,
            'price': price,
            'rate': rate,
            'website': website,
            'buyers': buyers
        }
        products.append(data)

    return products


def get_products_amazon(keyword):
    products = get_products_amazon_with_country(keyword, 'us')
    products += get_products_amazon_with_country(keyword, 'uk')
    return products


def get_products_ebay(keyword, price_range, is_used):
    """Gets a list of amazon products."""
    if is_used is True:
        is_used = 3000

    else:
        is_used = 1000

    url = "https://www.ebay.com/sch/i.html?_from=R40&_nkw={}&_sacat=0&_udhi={}&_udlo={}&rt=nc&LH_ItemCondition={}".format(
        keyword, str(price_range[1]), str(price_range[0]), str(is_used))
    page = urllib3.PoolManager().request('GET', url).data
    soup = BeautifulSoup(page, 'html.parser')
    x = clean_soup_ebay(soup)
    return x


def clean_soup_ebay(soup):
    """Cleans soup object from any tags but body and removes all tag attributes."""
    # Remove script tag
    for tag in soup('script'):
        tag.decompose()

    collector = []
    for tags in soup.find_all('div', {"class": "s-item__wrapper clearfix"}, limit=20):
        # Image
        img_s = tags.find('div', {"class": "s-item__image-section"})
        img_t = img_s.find('div', {"class": "s-item__image"})
        img = img_t.find('div', {"class": "s-item__image-wrapper"})
        img = img.find('img', {"class": "s-item__image-img"})
        # title
        title_s = tags.find('div', {"class": "s-item__info clearfix"})
        link = title_s.find('a', {"class": "s-item__link"})
        title = link.find('h3', {"class": "s-item__title"})
        tempo = tags.find('div', {"class": "s-item__info clearfix"})
        rate_s = title_s.find('div', {"class": "s-item__reviews"})
        # rate = rate_s.find('span',{"class":"clipped"})
        Rate = 0
        if rate_s is None:
            Rate = 0
        else:
            Rate = float(rate_s.text[0:3])

        price_s = tags.find('div', {"class": "s-item__details clearfix"})
        price_er = price_s.find('div', {"class": "s-item__detail s-item__detail--primary"})
        price = price_s.find('span', {"class": "s-item__price"})

        collector.append({
            'image': img['src'],
            'link': link['href'],
            'name': title.text,
            'rate': Rate,
            'price': price.text[0:6],
            'website': 'ebay',
            'buyers': 0
        })

    return collector


def get_products_souq(keyword, price_range):
    """Gets a list of Souq products."""

    url = "https://egypt.souq.com/eg-en/{}/{}-{}-EGP/a-cp/s/?page=1".format(keyword, str(price_range[0]),
                                                                            str(price_range[1]))
    page = urllib3.PoolManager().request('GET', url).data
    soup = BeautifulSoup(page, 'html.parser')
    x = clean_soup_souq(soup)
    return x


def truncate(n, decimals=0):
    multiplier = 10 ** decimals
    return int(n * multiplier) / multiplier


def clean_soup_souq(soup):
    """Cleans soup object from any tags but body and removes all tag attributes."""
    # Remove script tag
    for tag in soup('script'):
        tag.decompose()
    collector = []
    for tags in soup.find_all('div', {"class": "column column-block block-list-large single-item"}, limit=20):
        # title
        title = tags['data-name']

        linker = tags.find('a', {"class": "img-bucket img-link itemLink sPrimaryLink"})
        # link
        link = linker['href']
        img_s = linker.find('img', {"class": "img-size-medium imageUrl"})
        # img
        img = img_s['data-src']
        price_er = tags.find('div', {"class": "col col-buy"})
        price_sub = price_er.find('ul', {"class": "list-blocks"})
        price_suber = price_sub.find('div', {"class": "price-inline"})
        przzr = price_suber.find('div', {"class": "is sk-clr1"})
        price = przzr.find('h3', {"class": "itemPrice"})
        pricexx = price.text
        pricexx = "le" + pricexx[:-3]

        # rater = tags.find('span', {"class": "rating-stars"})
        rate = 0
        if tags.find('span', {"class": "rating-stars"}) is None:
            rate = 0
        else:
            rater = tags.find('span', {"class": "rating-stars"})
            rater_s = rater.find('i', {"class": "star-rating-svg"})
            rater_x = rater_s.find('i')
            rate = str(rater_x['style'])
            rate = float(int(rate[6:-1]) / 100 * 5)
            rate = truncate(rate, 1)
        collector.append({
            'image': img,
            'link': link,
            'name': title,
            'rate': rate,
            'price': pricexx,
            'website': 'souq',
            'buyers': 0
        })

    return collector


def get_all_products(keyword, price_range, is_used):
    products = []
    try:
        products += get_products_ebay(keyword, price_range, is_used)
    except:
        pass
    try:
        products += get_products_souq(keyword, price_range)
    except:
        pass
    try:
        products += get_products_amazon(keyword)
    except:
        pass

    return products


def filter_products(keyword, price_range, category, products):
    # Remove unwanted results
    new_products = []
    for product in products:
        price = product['price']
        if price[0] == '$':
            price = float(price[1:].replace(',', '')) * 16.2
        elif price[0] == 'l':
            price = float(price[2:].replace(',', ''))
        else:
            price = float(price[1:].replace(',', '')) * 21.2
        product['price'] = price

        # Skip if price out of scope
        if price < float(price_range[0]) or price > float(price_range[1]):
            continue

        # Skip if keyword not found
        if product['name'].lower().find(keyword.lower()) == -1:
            continue

        new_products.append(product)

    # Remove outliers and category non-fits
    total_price = 0
    for product in new_products:
        total_price += product['price']
    average = total_price / len(new_products)

    products = new_products
    new_products = []
    for product in products:
        if product['price'] < average / 2:
            continue

        # Remove based on category
        if category == 'low' and product['rate'] > 2.5:
            continue
        elif category == 'medium' and (product['rate'] > 3.7 or product['rate'] < 2.5):
            continue
        elif category == 'high' and product['rate'] < 3.7:
            continue

        new_products.append(product)

    # Get cheapest, top and best products
    counter, min_price, max_price, best_rate = 0, 100000000, 0, 0
    cheapest_product, top_rated_product, most_expensive_product = new_products[0], new_products[0], new_products[0]
    for product in new_products:
        if product['price'] < min_price:
            min_price = product['price']
            cheapest_product = product
        if product['price'] > max_price:
            max_price = product['price']
            most_expensive_product = product
        if product['rate'] > best_rate:
            best_rate = product['rate']
            top_rated_product = product


    # Collect other product links according to the name nearest to keyword
    products = new_products
    new_products = []
    for product in products:
        commonality = get_common_words_len(product['name'], keyword)
        new_products.append((commonality, product))

    print(new_products)
    new_products = sorted(new_products, key=lambda x: x[0])
    websites = {}
    final_products = []
    for product in new_products:
        if len(websites.keys()) >= 4:
            break
        if product[1]['website'] not in websites:
            final_products.append(product)
            websites[product[1]['website']] = 1

    products = final_products
    final_products = []
    for product in products:
        final_products.append(product[1])

    return {'cheapest': cheapest_product,
            'top_rated': top_rated_product,
            'most_expensive': most_expensive_product,
            'other': final_products}


def get_common_words_len(s1, s2):
    s1, s2 = s1.replace(',', ''), s2.replace(',', '')
    common = set(s1).intersection(set(s2))
    return len(common)