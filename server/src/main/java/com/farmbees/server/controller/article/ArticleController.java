package com.farmbees.server.controller.article;

import com.farmbees.server.model.article.Article;
import com.farmbees.server.model.article.ArticleResponse;
import com.farmbees.server.model.article.SingleArticleResponse;
import com.farmbees.server.repository.article.ArticleRepository;
import com.farmbees.server.service.article.ArticleService;
import com.farmbees.server.service.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/article")
public class ArticleController {
    private final TokenService tokenService;
    private final ArticleService articleService;
    private final ArticleRepository articleRepository;

    public ArticleController(TokenService tokenService, ArticleService articleService, ArticleRepository articleRepository) {
        this.tokenService = tokenService;
        this.articleService = articleService;
        this.articleRepository = articleRepository;
    }

    @PostMapping("/post")
    public void postArticle(@RequestBody Article article, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null){
            if(tokenService.expertTokenValidator(token)){
                String expertEmail = tokenService.getEmailFromToken(token);
                boolean posted = articleService.postArticle(article, expertEmail);

                if(posted){
                    response.setStatus(200);
                }
                else{
                    response.setStatus(500);
                }
            }
            else{
                response.setStatus(401);
            }
        }
        else{
            response.setStatus(401);
        }
    }

    @GetMapping("/{id}")
    public SingleArticleResponse getArticle(@PathVariable int id){
        return articleService.getArticleById(id);
    }

    @GetMapping("/all")
    public List<ArticleResponse> getAllArticles(){
        return articleRepository.getAllArticles();
    }
}
