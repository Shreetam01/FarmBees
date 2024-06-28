package com.farmbees.server.service.article;

import com.farmbees.server.model.article.Article;
import com.farmbees.server.model.article.ArticleResponse;
import com.farmbees.server.model.article.SingleArticleResponse;
import com.farmbees.server.repository.article.ArticleRepository;
import com.farmbees.server.repository.expert.ExpertRepository;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    private final ExpertRepository expertRepository;
    private final ArticleRepository articleRepository;

    public ArticleService(ExpertRepository expertRepository, ArticleRepository articleRepository) {
        this.expertRepository = expertRepository;
        this.articleRepository = articleRepository;
    }

    public boolean postArticle(Article article, String email){
        int eid = expertRepository.getExpertIdByEmail(email);
        String title = article.getTitle();
        String fullArticle = article.getFullArticle();
        String imageData = article.getImageData();
        return articleRepository.insertNewArticle(eid, title, fullArticle, imageData);
    }

    public SingleArticleResponse getArticleById(int id){
        if (articleRepository.articlePresent(id)){
            return articleRepository.getArticleById(id);
        }
        else return null;
    }
}
