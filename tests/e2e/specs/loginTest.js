module.exports = {
    'Home Page Test and Login': function (browser) {
        browser
            .url('http://localhost:5173/')
            .waitForElementVisible('#app', 10000)
            .assert.containsText('#accueil h2', "Découvrez la puissance de l'IA pour déterminer le prix de votre voiture")
            // Cliquez sur le bouton "Connexion" en utilisant le texte du bouton comme sélecteur
            .click('#login')
            .waitForElementVisible('#email', 5000)
            .setValue('#email', 'jsonautos@gmail.com')
            .setValue('#password', 'test2023')
            .click('button[type="submit"]') 
            .waitForElementVisible('#Dashboard', 10000)
            .end();
    }
};