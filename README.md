# SkinSense
An android app that uses machine learning to detect the three most common types of skin cancer: Basal Cell Caricinoma, Squamous Cell Caricinoma, and Malignant Melanoma. The neural network is intended to compare the distance between distinctive features of an image, including color, patterns, and clusters of the person's skin. The native application sends the image to the machine learning for classification and the probability of each skin cancer is displayed to the user.

To test SkinSense, import the project into Android Studio then run it.

# What it does
<p>This is an app to detect and self-diagnose skin cancer using machine learning.</p>

<p>You take a picture of your skin using the native mobile application, then the picture is sent to my secure cloud server on Azure, where the Azure Machine Learning Service can classify the image by comparing its color and frequency of certain distinctive features of diseased skin to your skin, and finally, the output is sent back to the app where you will receive the probability of having each type of skin cancer. There is also the history tab, which displays your past uploads, and the medical profile tab, which allows you to check the symptoms you have from a drop-down menu.</p>

# How it was built
<p>SkinSense uses Android Studio for the application, Azure for the machine learning and cloud servers, Android Volley for the HTTP requests to the Azure Machine Learning Service, and Kaggle for the database of images to train the machine learning algorithm.</p>


