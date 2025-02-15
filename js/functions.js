$(document).ready(function() {
    $(".like-btn").click(function() {
        let likesText = $(this).next(".likes-count");
        let currentLikes = parseInt(likesText.text());
        let likeIcon = $(this).find("img");

        if (likeIcon.attr("src") === "/svg/like.svg") {
            likeIcon.attr("src", "/svg/like2.svg");
            likesText.text((currentLikes + 1) + " Likes");
        } else {
            likeIcon.attr("src", "/svg/like.svg");
            likesText.text((currentLikes - 1) + " Likes");
        }
    });
});
