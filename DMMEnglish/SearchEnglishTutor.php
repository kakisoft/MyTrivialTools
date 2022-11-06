<?php

/*

php SearchEnglishTutor.php

*/

require_once __DIR__ . '/vendor/autoload.php';
use Goutte\Client;


$searchEnglishTutor = new SearchEnglishTutor();
$allCountryList = $searchEnglishTutor->getCountryList();
// $allCountryList = $searchEnglishTutor->getCountryList('2022-11-3');  // 日付を指定する場合

// 出力
print_r($allCountryList);


class SearchEnglishTutor
{
    const COUNTRY_FILTER = [
        'オーストラリア',
        'スペイン',
        'イギリス',
        'オランダ',
        'ベルギー',
        'ギリシャ',
        'ハンガリー',
        'クロアチア',
        'ラトビア',
        'リトアニア',
        'ルーマニア',
        'ジョージア',
        'アルバニア',
        'アゼルバイジャン',
        'ボスニア・ヘルツェゴビナ',
        'モルドバ共和国',
        'ロシア',
        'モンゴル',
        'セルビア',
        'カザフスタン',
        'タジキスタン',
        'モンテネグロ',
        'サウジアラビア',
        'キルギス',
        'イエメン',
        'カタール',
        'バーレーン',
        'エジプト',
        'ナイジェリア',
        'ケニア',
        'スーダン',
        'ヨルダン',
        'チュニジア',
        'モロッコ',
        'カメルーン',
        'ジンバブエ',
        'ウガンダ',
        'タンザニア',
        'コンゴ民主共和国',
        'トーゴ',
        'ザンビア',
        'ベナン',
        'モーリシャス',
        'ガイアナ',
        'マラウイ',
        'アンゴラ',
        'レソト',
        '南アフリカ共和国',
        'フィリピン',
        'インド',
        'パキスタン',
        'ネパール',
        'インドネシア',
        'マレーシア',
        'スリランカ',
        'バングラデシュ',
        'ブータン',
        'パプアニューギニア',
        'メキシコ',
        'ブラジル',
        'ペルー',
        'パナマ',
        'ウルグアイ',
        'ベネズエラ・ボリバル共和国',
        'ドミニカ共和国',
        'ボリビア多民族国',
        'コスタリカ',
        'トリニダード・トバゴ',
        'バルバドス',
        'ベリーズ',
        'セントルシア',
        'ニカラグア',
        'アルゼンチン',
        'コロンビア',
        'ジャマイカ',
    ];

    const NUMBER_OF_MAX_PAGE = 20;

    public function getCountryList($date=null, $startTime=null)
    {
        date_default_timezone_set("Asia/Tokyo");

        $allCountryList = [];

        //================================
        if( $date === null){
            $date = date('Y-m-d');
        }

        if( $startTime == null){
            $startTime = date("H:i");
            // $startTime = '02:00';
        }

        //=========( 各ページのデータを取得 )=========
        for ($page = 1; $page <= self::NUMBER_OF_MAX_PAGE; $page++) {
            $targetUrl = "https://eikaiwa.dmm.com/list/?data[tab1][start_time]={$startTime}&data[tab1][end_time]=25:30&data[tab1][over_3years_experience]=0&data[tab1][country]=40,104,78,64,65,112,118,177,5,91,139,102,72,175,173,49,56,13,43,41,39,28,35,211,70,24,16,21,53,4,22,32,27,85,97,52,42,3,14,31,12,93,109,103,94,101,86,38,214,99,36,83,79,84,124,132,88,29,10,106,98,77,158,140,37,183,133,204,18,209,120,137,63,134,123,100,44,131,47,62,157,6,117,57,81,197,192,128,23,17,60,129,59,166,111,174,115,116,113,121&data[tab1][gender]=0&data[tab1][age]=年齢&data[tab1][free_word]=&data[tab1][new]=0&data[tab1][lesson_language]=en&date={$date}&page={$page}";
            $decodedUrl = urldecode($targetUrl);

            // \Log::debug($decodedUrl);
            /*
            [2022-09-28 05:21:56] local.DEBUG:
            local.DEBUG: https://eikaiwa.dmm.com/list/?data[tab1][start_time]=02:00&data[tab1][end_time]=25:30&data[tab1][over_3years_experience]=0&data[tab1][country]=40,104,78,64,65,112,118,177,5,91,139,102,72,175,173,49,56,13,43,41,39,28,35,211,70,24,16,21,53,4,22,32,27,85,97,52,42,3,14,31,12,93,109,103,94,101,86,38,214,99,36,83,79,84,124,132,88,29,10,106,98,77,158,140,37,183,133,204,18,209,120,137,63,134,123,100,44,131,47,62,157,6,117,57,81,197,192,128,23,17,60,129,59,166,111,174,115,116,113,121&data[tab1][gender]=0&data[tab1][age]=年齢&data[tab1][free_word]=&data[tab1][new]=0&data[tab1][lesson_language]=en&date=2022-09-28&page=2  
            */

            $client = new Client();
            $crawler = $client->request('GET', $decodedUrl);

            $perPageCountryList = $crawler->filter('.countryname')->each(function ($node) {
                if( $node->text() != null ){
                    return strval($node->text());
                }
            });

            $allCountryList = array_merge($allCountryList, $perPageCountryList);
        }

        //=========( 取得したデータから重複を削除 )=========
        $allCountryList = array_unique($allCountryList);


        //=========( 調査済みの国はフィルタリング )=========
        $allCountryList = array_filter($allCountryList,
            function ($el){
                if(in_array($el, self::COUNTRY_FILTER) === false){
                    return true;
                }else{
                    return false;
                }
            }
        );


        return $allCountryList;
    }
}

/*

    <p class="from">
        <span class="countryname"><img src="https://image.eikaiwa.dmm.com/assets/p/general/eikaiwa/common/flag/serbia.png" alt="セルビア国旗">
            セルビア        </span>
    </p>

*/
