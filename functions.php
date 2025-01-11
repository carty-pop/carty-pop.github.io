<?php 
function enqueue_my_react_app() {
    // Assuming your React bundle is located at /wp-content/themes/my-theme/dist/index.js
    wp_enqueue_script(
        'my-react-app',
        get_template_directory_uri(). '/src/assets/scripts/index.js',
        array(),
        '1.0.0', // Version number
        true // Load in footer
    );

    wp_enqueue_script('font-awesome', 'https://kit.fontawesome.com/aba24e5310.js', true);
}
add_action('wp_enqueue_scripts', 'enqueue_my_react_app');

// Add this code to your theme's functions.php file

function theme_styles() {
    // Register the main stylesheet
    wp_register_style('main-style', get_template_directory_uri(). '/style.css');
    wp_register_style('app-style', get_template_directory_uri(). '/src/assets/styles/index.css');

    wp_enqueue_style('main-style');
    wp_enqueue_style('app-style');
}

// Hook the function to the wp_enqueue_scripts action
add_action('wp_enqueue_scripts', 'theme_styles');


?>