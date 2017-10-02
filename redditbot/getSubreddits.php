<?php

scrapeTrending("http://redditlist.com/sfw");

function scrapeTrending($url) {
    // echo "Scraping: " . $url . "<br>";
    $cr = curl_init($url);
    curl_setopt($cr, CURLOPT_RETURNTRANSFER, true); 
    curl_setopt($cr, CURLOPT_SSL_VERIFYPEER, false);
    $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36';
    curl_setopt($cr, CURLOPT_USERAGENT, $user_agent);
    curl_setopt($cr, CURLOPT_COOKIEFILE, 'cookie.txt'); 
    $html = curl_exec($cr);
    curl_close($cr);
    
    // echo $gsa;
    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    
    $classname="subreddit-url";
    $finder = new DomXPath($dom);

    if ($spaner = $finder->query("//*[contains(@class, '$classname')]")) {
        $i = 0;
        $n = 0;
        $matchArray = array();
    
        // echo "<ul class='list-group'>";
        $string = "";
        foreach ($spaner as $element) {
            // echo $element->textContent;
            // if ($i < 10) {
                // echo "<pre>" . print_r($element) . "</pre>";
                $string .=  trim($element->nodeValue) . "\n";
                // echo "<button class='list-group-item list-group-item-action btnTrending' value='" . $topic . "'>" . $topic . "</button><br>";
                // echo "<a href='searchAndSummarize.php?q=" . htmlentities($topic) . "' class='linkTrending'>" . $topic . "</a><br>";
            // }
            // $i++;
        }
        echo $string;
        
        // echo "</ul>";
    } else {
        echo "Subreddits Not Loaded";
    }
}