const jsonFile = "../../db-components/product.json";

//unique product ID
function generateProductId(category, id) {
    return `${category}${id}`;
}

fetch(jsonFile)
    .then(res => {
        return res.json();
    })
    .then(data => {
        const mensproductContainer = document.getElementById('product-insert-men');
        const womensproductContainer = document.getElementById('product-insert-women');
        const sportproductContainer = document.getElementById('product-insert-sport');

        // add to cart function
        function addToCart(product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
            if (existingProductIndex >= 0) {
                cart[existingProductIndex].quantity += 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
        
            localStorage.setItem('cart', JSON.stringify(cart));
            alert ( ` ${product.name} added to cart!`);
            displayCart(); 
        }

        //men category
        try {
            const menCategory = data.find(category => category.name === 'men');
            if (menCategory) {
                menCategory.products.forEach(product => {
                    const { id, 'P-name': name, price, imageDefault, imageHover } = product;
                    const uniqueId = generateProductId('men', id);
                    const productCard = `
                    <div class="col-3">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top"
                                src="${imageDefault}"
                                alt="${name}"
                                data-default-image="${imageDefault}"
                                data-hover-image="${imageHover}">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">$ ${price}</p>
                                <button class="add-to-cart btn btn-primary" data-id="${uniqueId}" data-name="${name}" data-price="${price}" data-image="${imageDefault}">Add to Cart</button>
                            </div>
                        </div>
                    </div>`;
                    mensproductContainer.insertAdjacentHTML('beforeend', productCard);
                });
            }
        } catch (error) {
            console.error('Error processing mens products:', error);
        }

        //women category
        try {
            const womenCategory = data.find(category => category.name === 'women');
            if (womenCategory) {
                womenCategory.products.forEach(product => {
                    const { id, 'P-name': name, price, imageDefault, imageHover } = product;
                    const uniqueId = generateProductId('women', id);
                    const productCard = `
                    <div class="col-3">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top"
                                src="${imageDefault}"
                                alt="${name}"
                                data-default-image="${imageDefault}"
                                data-hover-image="${imageHover}">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${price}</p>
                                <button class="add-to-cart btn btn-primary" data-id="${uniqueId}" data-name="${name}" data-price="${price}" data-image="${imageDefault}">Add to Cart</button>
                            </div>
                        </div>
                    </div>`;
                    womensproductContainer.insertAdjacentHTML('beforeend', productCard);
                });
            }
        } catch (error) {
            console.error('Error processing womens products:', error);
        }

        //sport category
        try {
            const sportCategory = data.find(category => category.name === 'sport');
            if (sportCategory) {
                sportCategory.products.forEach(product => {
                    const { id, 'P-name': name, price, imageDefault, imageHover } = product;
                    const uniqueId = generateProductId('sport', id);
                    const productCard = `
                    <div class="col-3">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top"
                                src="${imageDefault}"
                                alt="${name}"
                                data-default-image="${imageDefault}"
                                data-hover-image="${imageHover}">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${price}</p>
                                <button class="add-to-cart btn btn-primary" data-id="${uniqueId}" data-name="${name}" data-price="${price}" data-image="${imageDefault}">Add to Cart</button>
                            </div>
                        </div>
                    </div>`;
                    sportproductContainer.insertAdjacentHTML('beforeend', productCard);
                });
            }
        } catch (error) {
            console.error('Error processing sport products:', error);
        }

        // Add event listeners for hover effect 
        if (mensproductContainer || womensproductContainer || sportproductContainer) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const img = card.querySelector('.card-img-top');
                const defaultImage = img.getAttribute('data-default-image');
                const hoverImage = img.getAttribute('data-hover-image');

                card.addEventListener('mouseenter', () => {
                    img.src = hoverImage;
                });

                card.addEventListener('mouseleave', () => {
                    img.src = defaultImage;
                });
            });
        }

        // Add event listener for add to cart
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                const product = {
                    id: event.target.getAttribute('data-id'),
                    name: event.target.getAttribute('data-name'),
                    price: parseFloat(event.target.getAttribute('data-price')),
                    image: event.target.getAttribute('data-image'),
                    quantity: 1
                };
                addToCart(product);
            });
        });
    })
    .catch(error => console.error('Error fetching or processing the JSON file:', error));
