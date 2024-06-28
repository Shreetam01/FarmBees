package com.farmbees.server.model.article;

public class ArticleResponse {
    int id;
    String title;
    String initialLine;
    String imageData;

    private String getFirst40Characters(String originalString) {
        return originalString.substring(0, Math.min(originalString.length(), 40));
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInitialLine() {
        return initialLine;
    }

    public void setInitialLine(String initialLine) {
        this.initialLine = getFirst40Characters(initialLine);
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }
}
