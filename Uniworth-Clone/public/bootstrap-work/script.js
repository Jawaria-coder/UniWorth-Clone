var header = document.querySelector('.header-container');
let logo = document.getElementsByClassName('old-img')[0];
let cartImg = document.getElementsByClassName('cart-img')[0]; 

var sticky = header.offsetTop;

window.onscroll = function() {
    makeHeaderSticky();
};

function makeHeaderSticky() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        header.style.backgroundColor = 'white'; 
        header.style.color = 'black'; 
        
        logo.src = "/bootstrap-work/images/home_logo.png";
        logo.style.display = 'block';


        cartImg.src = "/bootstrap-work/images/Black_Search.png"; 
        cartImg.style.display = 'block'; 

        let menuItems = document.querySelectorAll('.menu span, .cart span, .menu i, .cart i, .account-nav');
        menuItems.forEach(item => {
            item.style.color = 'black'; 
        });
    } 
    else {
        header.classList.remove("sticky");
        header.style.backgroundColor = 'transparent'; 
        header.style.color = 'white'; 
        
        logo.src = "/bootstrap-work/images/logo_white.png";
        logo.style.display = 'block';

        cartImg.src = "/bootstrap-work/images/search-wht.png"; 
        cartImg.style.display = 'block';

        let menuItems = document.querySelectorAll('.menu span, .cart span, .cart i, .menu i, .account-nav');
        menuItems.forEach(item => {
            item.style.color = 'white'; 
        });
    }
}

// Changing images
const shirtImages = [
    { first: "/bootstrap-work/images/Navy.stripe.webp", second: "/bootstrap-work/images/Navy-Strip-2.webp", name: "Navy Stripe Classic Fit Shirt", price: "Rs.8,975.00" },
    { first: "/bootstrap-work/images/Shirt-2.png", second: "/bootstrap-work/images/Shirt2.1.png", name: "Pink/Black Check Tailored Smart Fit Shirtt", price: "Rs.4,995.00" },
    { first: "/bootstrap-work/images/Shirt-3.png", second: "/bootstrap-work/images/Shirt-3.2.png", name: "Check Blue/Red Classic Fit Shirt", price: "Rs.8,975.00" },
    { first: "/bootstrap-work/images/Shirt-4.png", second: "/bootstrap-work/images/Shirt-4.1.png", name: "Navy Check Tailored Smart Fit Shirt", price: "Rs.8,475.00" },
    { first: "/bootstrap-work/images/Shirt-5.png", second: "/bootstrap-work/images/Shirt-5.2.png", name: "Check Blue Tailored Smart Fit Shirt", price: "Rs.8,975.00" },
    { first: "/bootstrap-work/images/Shirt-6.png", second: "/bootstrap-work/images/Shirt-6.2.png", name: "Red Stripe Tailored Smart Fit Shirt", price: "Rs.5,995.00" }
];

const accessoryImages = [
    { first: "/bootstrap-work/images/AC-1.1.png", second: "/bootstrap-work/images/AC-1.png", name: "Blue Tie", price: "Rs.1,500.00" },
    { first: "/bootstrap-work/images/AC-2.png", second: "/bootstrap-work/images/AC-2.png", name: "Grey Cozy Socks", price: "Rs.800.00" },
    { first: "/bootstrap-work/images/AC-3.png", second: "/bootstrap-work/images/AC-3.1.png", name: "Silver Cufflink", price: "Rs.2,200.00" },
    { first: "/bootstrap-work/images/AC-4.1.png", second: "/bootstrap-work/images/AC-4.png", name: "Blue Tie", price: "Rs.1,500.00" },
    { first: "/bootstrap-work/images/AC-5.png", second: "/bootstrap-work/images/AC-5.1.png", name: "Orange Tie", price: "Rs.1,700.00" },
    { first: "/bootstrap-work/images/AC-6.1.png", second: "/bootstrap-work/images/AC-6.png", name: "Lapel Pin", price: "Rs.900.00" }
];

const winterCollection =[
    { first: "/bootstrap-work/images/WC-1.png", second: "/bootstrap-work/images/WC-1.1.png", name: "Shirt", price: "Rs.8,975.00"  },
    { first: "/bootstrap-work/images/WC-2.png", second: "/bootstrap-work/images/WC-2.1.png", name: "Check t Shirt", price: "Rs.8,975.00"  },
    { first: "/bootstrap-work/images/WC-3.png", second: "/bootstrap-work/images/WC-3.1.png", name: "Blue/Red Classic Fit Shirt", price: "Rs.8,975.00"  },
    { first: "/bootstrap-work/images/WC-4.png", second: "/bootstrap-work/images/WC-4.1.png", name: "Check Blue/Red Shirt", price: "Rs.8,975.00"  },
    { first: "/bootstrap-work/images/WC-5.png", second: "/bootstrap-work/images/WC-5.1.png", name: "Blue/Red Fit Shirt", price: "Rs.8,975.00"  },
    { first: "/bootstrap-work/images/WC-6.png", second: "/bootstrap-work/images/WC-6.1.png", name: "Check Red Classic Fit Shirt", price: "Rs.8,975.00"  }
];

const boxes = document.querySelectorAll(".box");

const accessories = document.getElementById("Accessories");
const Shirt = document.getElementById("Shirt");
const winter = document.getElementById("Summer");

accessories.addEventListener("click", function (event) {
    event.preventDefault();
    winter.style.color = "Black";
    Shirt.style.color = "Black";
    accessories.style.color = "red";
    updateImages(accessoryImages);
});

Shirt.addEventListener("click", function (event) {
    event.preventDefault();
    winter.style.color = "Black";
    accessories.style.color = "Black";
    Shirt.style.color = "red";
    updateImages(shirtImages);
});

winter.addEventListener("click", (event)=> {
    event.preventDefault();
    Shirt.style.color = "Black";
    accessories.style.color = "Black";
    winter.style.color = "red";
    updateImages(winterCollection);

});

function updateImages(images) {
    boxes.forEach((box, index) => {
        const firstImage = box.querySelector(".first-image");
        const secondImage = box.querySelector(".second-image");
        const productName = box.querySelector(".product-name");
    const productPrice = box.querySelector(".product-price");

        firstImage.src = images[index].first;
        secondImage.src = images[index].second;
        productName.textContent = images[index].name; 
        productPrice.textContent = images[index].price; 
    
        
    });
}


