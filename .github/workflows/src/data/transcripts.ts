export interface TranscriptLine {
  timestamp: string;
  speaker: string;
  text: string;
}

export interface Transcript {
  id: string;
  label: string;
  lines: TranscriptLine[];
}

function parseTranscript(raw: string): TranscriptLine[] {
  const lines: TranscriptLine[] = [];
  const regex = /(\d{2}:\d{2}:\d{2})\s+(Prelegent\s+\d+):\s*(.*)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    const timestamp = match[1];
    const speaker = match[2];
    const text = match[3].trim();
    if (text.length > 0) {
      lines.push({ timestamp, speaker, text });
    }
  }

  return lines;
}

const raw_P1_N1 = `00:00:00 Prelegent 1: Dobra.
00:00:03 Prelegent 1: No to ja tam wcisnąłem sobie te.
00:00:49 Prelegent 1: Trudno.
00:03:10 Prelegent 1: No to to może dawaj jak końcówka. Spróbuję przeczytać końcówka tutaj.
00:03:19 Prelegent 1: Aha ok, aaa tu gdzie skończyłęś?
00:03:26 Prelegent 1: Ok, no bo musimy dobra to instrukcje przecież. Aha, ok, dobra pytanie pomocnicze, jakie emocje przeżywa bohaterka? No mi się wydaje, że ona jest.
00:03:39 Prelegent 1: Bardzo samotna, jakaś i to znaczy w jej głowie siedzi, siedzą zupełnie inne myśli niż takie jakieś rodzinne.
00:03:57 Prelegent 1: Wiesz, ona coś przeżywa i prawdopodobnie przeżywa dość boleśnie i mocno, bo chyba coś dużo bardziej dotknęło jej tak, jakby wiesz wnętrza i przez to ona nie może się na tym.
00:04:11 Prelegent 1: Skupić i jakoś tak z tego co zrozumiałem to ona zamiast tego, żeby robić tą kolację to zaczęła sprzątać, więc no może sobie, bo zazwyczaj tak jest, że jak ludzie to znaczy czasami tak jest, że bardzo pomaga ludziom.
00:04:31 Prelegent 1: Odejść od jakiejś sytuacji robiąc coś, więc chyba o nas tak tak tak, chociaż równie dobrze to mogłoby być te te gotowanie kolacji. Nie wiem jakie emocje przeżyły, no.
00:05:06 Prelegent 1: To są, obstawiam, że niech będzie to wigilia.
00:05:56 Prelegent 1: Ona jest młoda.
00:06:34 Prelegent 1: No u mnie wiesz, u mnie to sytuacja troszkę wygląda gorzej, bo ja bo ja tutaj Jestem sam to mam tak i nie.
00:06:41 Prelegent 1: Poczucie samotności to znaczy być?
00:06:48 Prelegent 1: Samemu i być samotnym, no to już zupełnie inne rzeczy, bo być samemu. Ja na przykład sam ze sobą fajnie się czuję, ale nie czuję się samotnym, bo mam dość dużo różnego rodzaju.
00:07:02 Prelegent 1: Wiesz, praca znajomi, przyjaciele, relacje, która nie pozwalają mi być tak, jakby samotnym, ale żeby nie było, czasami się czuję bardzo samotnie. Czasami tak jest, że wiesz, że pomimo tego, że każdy chyba z nas może coś takiego mieć.
00:07:21 Prelegent 1: Mi się tak przynajmniej wydaje, że pomimo tego, że jest w moim otoczeniu dość dużo ludzi, to pomimo wszystkiego ja się czuję samotnie, bo wiesz przez to, że na przykład czasami nie ma do kogo zagadać. Jak przychodzę do domu i nie ma na przykład dziewczyn, no to.
00:07:41 Prelegent 1: To jest mi jakoś tak, wiesz, no nie zawsze jest czasami jak na tym się złapie, to może być mnie tak trochę smutno mówię, hm taki taki, wiesz, duży dom ogromny, a ja tu sam i jakoś tak wiesz, ale.
00:07:59 Prelegent 1: To znaczy, zauważyłem, że to wtedy jak ja nie mamy nic tak jakby do roboty i nie mam nic do tak jakby czym się zająć. O to to to może być to czasami tak, ale powiedziałbym nie zawsze i prawdopodobnie ona.
00:08:22 Prelegent 1: Mmm może za bardzo zbyt mocno odbiega swoim umysłem od tych, którzy który którzy otaczają ją i przez to ona nie może z kimś jakoś tak wiesz, bo teraz jest jaka boję się inaczej.
00:08:38 Prelegent 1: Bo w dzisiejszym czasie mi się wydaje, rozmowa jest bardziej taka, wiesz, płytka powierzchniowa, nie ugłębiamy się, wiesz niżej, głębiej w tą rozmowę, tylko to takie. A co u ciebie? A tam wszystko fajnie super, a tam to to to, a jak naprawdę człowiek się czuje, no to.
00:08:59 Prelegent 1: Bardzo trudne te to jest do do pogadania z kimś, żeby ktoś cię wysłuchał, nie powiedział, że o ty jakieś tam gówno mówisz, czy jest jest czy tam jakiś zły, czy tam jakiś nie, nie taki nie.
00:09:14 Prelegent 1: Yy nie żeby normalnie wiesz, wysłucha powiedział nawet na przykład jak ja nie Jestem zainteresowany tam w czymś tym, albo myślę inaczej, no to ja i tak mogę wysłuchać tą stronę też chcę usłyszeć.
00:09:31 Prelegent 1: Co tam u tej osoby boli na przykład no nie fizyczny tylko.
00:09:41 Prelegent 1: Tak, tak.
00:09:54 Prelegent 1: No.
00:10:12 Prelegent 1: No lubi.
00:10:49 Prelegent 1: U mnie można powiedzieć ze względu na to, że tak tak tak ja tu Jestem sam.
00:10:59 Prelegent 1: Mnie akurat nie.
00:11:16 Prelegent 1: I.
00:11:27 Prelegent 1: Mimo tego, że Jestem taką osobą, która za bardzo tam nie tęskni za domem, nie tęskni za tam rodzicami i.
00:11:37 Prelegent 1: Naprawdę powiem, że bardzo rzadko to się zdarza, aż sam się dziwię mówię no, bo jak tak jak jak tak też może.
00:11:46 Prelegent 1: I, ale wiesz, czasami może być tak, że na przykład zdzwaniam się z matką tam 2 3 razy w tygodniu.
00:11:54 Prelegent 1: A czasami raz w 10 dni.
00:12:47 Prelegent 1: Więc.
00:12:54 Prelegent 1: Tu.
00:12:54 Prelegent 1: Nie ma moim zdaniem to wiesz, wszystko ma wpływ na to na tego czy innego człowieka, jak on się zachowuje na przykład w konkretnym czy no jak bierzmy do uwagi to co się działo tak jakby teraz.
00:13:10 Prelegent 1: Bo gdybym na przykład ja nie wyjechał, to na pewno ja bym spędzałbym w z rodzicami na przykład tą samą wigilię i nie czułbym się samotnie, prawdopodobnie chociaż na przykład tak jakby i ta miłość.
00:13:30 Prelegent 1: Do drugiej osoby to też musi nie musi. Na przykład ja bym chciał, tylko żebym nie czuć się.
00:13:42 Prelegent 1: Chodzi mi o związek, bo na przykład z rodziną ok ja tam mogę spędzić na przykład tam pierwsze 2 godziny.
00:13:51 Prelegent 1: No a dalej to już tam każdy sam sobie tam wiesz, sprzątnęliśmy tam i i koniec na tym.
00:14:03 Prelegent 1: Wiesz no.
00:14:07 Prelegent 1: Biorąc pod uwagę na przykład 20 lat, to już.
00:14:49 Prelegent 1: Zgadzam się.
00:15:03 Prelegent 1: No tylko znaczy to jeszcze też wiesz, może wynikać z tego, że na przykład z matką ona tam na przykład rozmawiała, jakoś tam, wiesz, kiepsko, ale albo ona ją obraziła kiedyś w dzieciństwie i ona trzyma, to wiesz.
00:15:19 Prelegent 1: Na przykład w wieku 10 lat. Tam ona chciała, będąc jeszcze mało, ona chciała tam coś, a matka na nią tak nakrzyczała, że ona wiesz, płakała przez tam nie wiem, pół dnia i wiesz, to zrobiło ogromną ranę w jej duszy, na przykład i teraz ona nie może odpuścić.
00:15:37 Prelegent 1: I przez to ona przeżywa, bo nie może ją zaprosić, bo trzyma na nią tą jak nie złość tylko, no no wiesz takie.
00:15:55 Prelegent 1: No prawdopodobnie przez to, że ona nie może.
00:16:04 Prelegent 1: No może.
00:16:14 Prelegent 1: Czyli tak jak były wynikało z tego.
00:16:32 Prelegent 1: No albo ją straciła na przykład jak Walentyna. Ona za bardzo nie ma nikogo. Jej ojciec, który pijący.
00:16:40 Prelegent 1: Tak pijący matki nie ma i w ogóle nie wiadomo jak sytuacja.
00:16:47 Prelegent 1: Babci i dziadków no odpowiedni też ktoś jest gdzieś tam po stronie dalekiej i na przykład do rodziny. No to do babci ona dzwoni do Włoch na przykład tutaj na do znajomych. Ja wiem.
00:17:04 Prelegent 1: No wiesz, gdybym ja też zadzwoniłbym do znajomych tam.
00:17:22 Prelegent 1: Jest osobą bardzo bardzo zamkniętą w sobie mi się wydaje.
00:17:31 Prelegent 1: Nie chce odpowiadać. Nie chce rozmów, które mogą wywołać jej jakieś tam nie wiem, łzy, poczucie winy czy czy czegoś podobnego.
00:17:43 Prelegent 1: I w pewnym stopniu ona jest temu winna sama, bo dlaczego tak się dzieje? Ludzie nie potrafią rozmawiać między sobą.
00:17:53 Prelegent 1: Tak, tak.
00:17:55 Prelegent 1: Spowodowała tym, że wiesz, to nie działo się na pewno tydzień 2 to działo się działo się latami. Tak ona unikała takich rozmów. No unikała rozmów bardziej pogłębionych.
00:18:12 Prelegent 1: Z tym rodzeństwem czy z kimś i to było tak jak mówię taka płytka, jakaś rozmowa co u ciebie, a tam dobrze nic się nie dzieje tam czy to jest?
00:18:41 Prelegent 1: Kto to jest nawet nic.
00:18:45 Prelegent 1: Albo jeszcze też projektujemy, każdy możemy znasz swoje przeżycie, kiedy były kiedyś.
00:18:51 Prelegent 1: I.
00:19:00 Prelegent 1: Bezpośrednio swoim.
00:19:12 Prelegent 1: Tak, dlaczego jest też sama, ona musi na to coś odpowiedzieć. To znaczy może chodzi o partnera, bo sama.
00:19:56 Prelegent 1: To jest problem w dzisiejszym czasie taki, że na przykład mamy dostęp.
00:20:03 Prelegent 1: Znaczy, jeśli chodzi o relacje o damsko męskie tu jak my takie dziewczyny mają dostęp do wszelkiego rodzaju od brzydkich do bardzo, chociaż to takie pojęcie brzydki i bardzo przystojny to jest dla każdego oceniany inaczej, ale.
00:20:23 Prelegent 1: Prościej mówiąc o różnego rodzaju facetów, mężczyzn bogatych, biednych, znanych, mniej znanych.
00:20:32 Prelegent 1: Miałem dostęp.
00:20:43 Prelegent 1: Wybrzydzają tak mocno, że jej się wydaje, że wiesz, że jak ona zamieszka na przykład z kimś tam, powiedzmy swojego poziomu tam, to znaczy mentalnego, psychicznego pieniężnego i tak dalej.
00:21:00 Prelegent 1: Że ona przegra tak jakby życie, bo ona przecież widzi, że w Instagramie jest tu taki milioner, na którego wiesz tam ślina u niej cieknie.
00:21:16 Prelegent 1: Czyli i przez to na przykład te związki nietrwałe, płytkie, bez większych, większego zaangażowania. Nie mówię, że to mi się wydaje, jednak to w większym stopniu działa na kobiety, bo jak facet się zakocha?
00:21:36 Prelegent 1: to na przykład dla niego jest obojętne jak ta, jaka to jest dziewczyna, skąd ona w ogóle pochodzi, ma jakieś środki, czy nie ma, ma wywalone.
00:21:54 Prelegent 1: Tak.
00:21:56 Prelegent 1: Później, żeby się.
00:21:58 Prelegent 1: No.
00:21:59 Prelegent 1: A na przykład no w kobiecym świecie no to to troszkę to już inaczej wygląda i i ten era instagramowa, no na pewno wiesz, nie, to jest nieświadomie.
00:22:15 Prelegent 1: Nie chociaż mi się wydaje, to jest zrobione albo wynikło to już dopiero wtedy, że ta era instagramu ona po prostu robi tak, żeby ludzi nie łączyć ze sobą, to znaczy nie robić rodziny.
00:22:33 Prelegent 1: Tylko jak najwięcej, żeby było par samotnych par samotnych. Oj boże par samotnych osób samotnych.
00:22:44 Prelegent 1: Dlaczego, bo to jeszcze też taka fajna. Mi się wydaje, że.
00:22:52 Prelegent 1: Manipulować ludźmi jest dużo bardziej lżej, jak osoba jest jedna.
00:22:59 Prelegent 1: Dużo ciężej, jak już jest 2, a jak jest cała rodzina i i i ta cała rodzina? Przykład, matka z ojcem, no i tam 2 już tam powiedzmy nastolatki nastolatkowe.
00:23:13 Prelegent 1: No to zmanipulować czworoma ludźmi jest już dużo dużo.
00:23:23 Prelegent 1: Dużo ciężej na przykład i to też jest powiedzmy no tak jakby byli.
00:23:32 Prelegent 1: Poprzez nie władzę, bo władza może tam nie do końca, ale przez najwyższych tych wiesz szczebli, no to jest to prawdopodobnie celowo jest robione, bo manipulować narzucać interesy, manipulować dużo prościej, dużo prościej.
00:23:50 Prelegent 1: Ale było. Odeszliśmy może od tematu?
00:24:00 Prelegent 1: A tutaj.
00:24:11 Prelegent 1: Właśnie, bo możemy mieć około 60 lat i ona jest w sumie nie jest aż taka kobieta.
00:24:17 Prelegent 1: A nie ma do kogo zadzwonić, bo na przykład ktoś.
00:24:23 Prelegent 1: No na przykład córka tak czy coś wyjechała gdzieś dalej czy tam.
00:24:33 Prelegent 1: Ale no ok, ale jakoś musimy to wiesz.
00:24:47 Prelegent 1: No.
00:24:51 Prelegent 1: A ile minut?
00:24:55 Prelegent 1: Wystarczy 25.
00:24:59 Prelegent 1: Osz ty.`;

const raw_P2_N1 = `00:00:01 Prelegent 2: Dobra.
00:00:05 Prelegent 2: Przeczytajcie uważnie historią, następnie porozmawiajcie ze sobą o tym, jak rozumiecie przeżycia bohaterki, jakie emocje według was odczuwa oraz co w jej sytuacji jest wam bliskie lub obce.
00:00:16 Prelegent 2: Nie ma dobrych ani złych odpowiedzi. Ważne jest swobodne wyrażenie myśli i reakcji na treść historii. Pytania pomocnicze, jakie emocje przeżywa bohaterka, czy samotność bohaterki jest świadomym wyborem czy sytuacją narzuconą, odwołując się do własnych doświadczeń, opiszcie, czy i w jakim stopniu przeżycia bohaterki są wam bliskie?
00:00:34 Prelegent 2: Czy podobne emocje pojawiły się u was w okresie świątecznym, w innych momentach życia? Co najbardziej poruszyło was w tej historii, z którym fragmentem najbardziej się utożsamiacie, a który jest wam obcy? Czytam długie.
00:00:51 Prelegent 2: Ciche święta.
00:00:52 Prelegent 2: W mieszkaniu pachniało mandarynkami, choć ich nikt ich specjalnie nie jadł. Stały w misce na stole bardziej jako znak, że to już ten czas niż realna potrzeba za oknem migotały świąteczne lampki sąsiadów, a ich światło odbijało się w szybie, tworząc wrażenie czyjeś obecności w środku. Jednak było cicho, zbyt cicho.
00:01:12 Prelegent 2: Siedziała na kanapie owinięta kocem z pilotem w dłoni. W telewizji leciał kolejny świąteczny film, rodzina, śmiech pojednania, przełączyła kanał. Irytowało ją to wszystko ta nachalna radość, poczucie, że powinno się czuć coś więcej, że wypada. Pomyślała o poprzednich świętach.
00:01:30 Prelegent 2: Wspominała i raczej bez nostalgii, bardziej jak fakty z czyjegoś życia. Kiedyś było inaczej, przemknęło jej przez głowę, ale nie potrafiła powiedzieć, czy to było lepsze. Teraz czuła głównie zmęczenie i jakąś dziwną pustkę, jakby te dni były pozbawione sensu. Nie zadzwoniła do nikogo celowo.
00:01:48 Prelegent 2: Wiedziała, że mogłaby, ale nie chciała tłumaczyć się z nastroju, ani odpowiadać na pytania w rodzaju: dlaczego jesteś sama? Była sama i mówiła to sobie wprost bez upiększeń. Nie miała partnera, nie miała nikogo, kogo mogłaby zaprosić do stołu. Ta świadomość bolała, choć jednocześnie dawała poczucie kontroli.
00:02:06 Prelegent 2: Brak oczekiwań oznaczał spokój. Zamiast przygotowywać kolację, zaczęła sprzątać kuchnię, potem układać książki, a na końcu bezmyślnie przyglądać telefon. Zajmowanie się czymkolwiek było łatwiejsze niż myślenie, unikanie rozmów, spotkań i świątecznych rytuałów stało się jej sposobem radzenia sobie.
00:02:25 Prelegent 2: A jednak, gdy zapaliła jedną małą świeczkę na stole, poczuła coś na kształt bezpieczeństwa. Ciepło i cisza było w tym jednocześnie coś kojącego i przygnębiającego. Smutek mieszał się z ulgą, chciała bliskości, ale bała się braku, ale bała się jej braku jeszcze bardziej.
00:02:43 Prelegent 2: Kiedy wybiła północ, nie wydarzyło się nic szczególnego, żadnego przełomu, tylko cisza, która została i pytanie, czy to obojętność, czy raczej zmęczenie, emocjami, które nie potrafiły się ułożyć święta po prostu minęły, a ona nadal była w tym samym miejscu trochę wykluczona, trochę chroniona.
00:03:02 Prelegent 2: Zawieszony zawieszona gdzieś pomiędzy potrzebą bycia z kimś a świadomym wyborem bycia samej.
00:03:14 Prelegent 2: Tych tego, czy tych pytań to jest ta ta historia, tam masz pytania.
00:03:22 Prelegent 2: No to jest koniec, koniec już wszystko, prawda? Myślałem, że chciałeś jeszcze powtórzyć sobie.
00:04:44 Prelegent 2: Ale to nie tak, no bo to my mamy rozmawiać, to są te tematy pomocnicze, chodzi o to, żebyśmy sobie teraz potem podyskutowali, a nie odpowiadali na te pytania i dla mnie ta historia jest taka trochę bardzo ogólna znaczy, żeby ją zinterpretować, musiałbym wiedzieć o.
00:05:00 Prelegent 2: Jaką jaki dzień chodzi, bo mam wątpliwości czy to chodzi o wigilię, czy chodzi o sylwestra?
00:05:07 Prelegent 2: Czekanie na północ, no to to jest podejście różne, bo znaczy ja nigdy nie byłem w takiej sytuacji jak ta kobieta, to znaczy nigdy nie byłem sam.
00:05:18 Prelegent 2: Ani w wigilię, ani w sylwestra. Zawsze byłem z kimś, nie zawsze były to w sylwestra na przykład jakieś wielkie przyjątka mógł to być tylko mój partner, na przykład jak w ostatnich latach.
00:05:32 Prelegent 2: A w wigilię nigdy nie byłem sam, nawet w takim sensie, że tylko z partnerem zawsze to była rodzina albo najbliżsi przyjaciele, więc dla mnie.
00:05:44 Prelegent 2: W ogóle poczucie samotności, święta czy w ogóle ogólnie poczucie samotności jest absolutnie obce i to co, o czym te emocje, które tu się pojawiają.
00:05:57 Prelegent 2: Chyba tak dosyć młoda tutaj ja.
00:06:05 Prelegent 2: No nigdy nie byłem w takiej sytuacji, żebym tak jak tutaj było, że ona mogłaby się z kimś spotkać i dobrze pamiętam, ale nie chciała, bo byłyby jakieś tam pytania, dlaczego jest sama i dlaczego tam się chyba chodzi o to, że nie chciała się wpraszać albo.
00:06:21 Prelegent 2: Przyciągać kojarzy się no to ja myślę, że zawsze mam gdzie pójść i nikt nie będzie mnie pytał dlaczego i tą tą odskocznią jest przede wszystkim rodzina.
00:06:41 Prelegent 2: Możesz też tam pojechać.
00:09:39 Prelegent 2: No boli w sensie emocjonalnie.
00:09:43 Prelegent 2: Mam trochę inną sytuację niż te, bo.
00:09:47 Prelegent 2: No od prawie 20 lat jestem z Markiem i jak wiadomo Marek dużo lubi gadać.
00:09:54 Prelegent 2: To razem pracujemy to i razem cały jesteśmy prawie prawie cały czas razem, chyba że na nas jednego z nas nie ma w domu, co często jest tak, że.
00:10:05 Prelegent 2: I też jak Marek się rozgada na jakiś temat mogę sobie pomyśleć. Mój boże niech już wreszcie skończy.
00:10:13 Prelegent 2: Lubi gadać i ma swoje takie koniki, o których lubi rozmawiać. Znaczy, Przepraszam, przemawiać i.
00:10:22 Prelegent 2: To może być męczące, więc nie mam takiej sytuacji, kiedy nie mam się do kogo odezwać, bo zawsze mam się do kogo odezwać. Czasami mogę tylko mieć problem z przerwaniem komuś chcę mówić, czyli Markowi i druga rzecz tutaj jeszcze jest taka, że ona ma taką.
00:10:38 Prelegent 2: Konkretną cezurę czasową taką granicę pomiędzy tym, co było kiedyś, kiedy w święta dużo się działo, a tym co jest teraz na u mnie tej cezury nie ma takiej tej granicy.
00:10:53 Prelegent 2: Więc jakby te doświadczenia dla mnie tej kobiety są absolutnie obce.
00:11:01 Prelegent 2: I to właśnie wynika z całkowicie innego doświadczenia, bo ja też nie mam tego doświadczenia, które ty, czyli życia za granicą, w obcym całkowicie środowisku.
00:11:17 Prelegent 2: No bo to to już w ogóle jest obce i to pewnie tą samotność u ciebie czy poczucie samotności może?
00:11:22 Prelegent 2: Wywoływać.
00:11:23 Prelegent 2: Pogłębiać nawet jeszcze nie tylko wywoływać, ale jeszcze pogłębiać.
00:11:43 Prelegent 2: Wypadałoby tak.
00:11:56 Prelegent 2: I to znowu mamy całkowicie odrębne doświadczenia, bo ja z moją matką gadam kilka razy dziennie, opowiadałem dzisiaj o o rozmowie z moim przyjacielem z liceum, który mieszka w Wielkiej Brytanii i tam był bardzo zdziwiony, że.
00:12:12 Prelegent 2: Ja i Marek nawet jak my jesteśmy we Włoszech, że on rozmawia z matką kilka razy dziennie. No a a przecież mieszkamy razem cały czas, on z matką, która jest daleko rozmawia raz w tygodniu, bo on po prostu nie ma czasu i to jest. Ciekawostka też właśnie czy?
00:12:31 Prelegent 2: Ta te relacje z innymi, czy to jest wybór kogoś, czy konieczność? W przypadku Olgierda ten ilość kontaktu z matką jest koniecznością, bo on bardzo dużo pracuje. Do tego ma dwoje dzieci, którzy, które zawodowo znaczy zawodowo profesjonalnie uprawiają sport są.
00:12:47 Prelegent 2: To jest poważne zatem, a tutaj z tej historii.
00:12:51 Prelegent 2: Trudno jest wyczuć, czy to jest jej wybór.
00:12:54 Prelegent 2: Nic.
00:13:40 Prelegent 2: A że chciałbyś być w związku, że.
00:13:56 Prelegent 2: Tak, tylko że później, w związku, który trwa już 20 kilka lat, to sytuacja jest podobna.
00:14:02 Prelegent 2: To też nie.
00:14:03 Prelegent 2: Też nie siedzisz cały czas?
00:14:05 Prelegent 2: Masz swoje zajęcia i tak dalej i ja już w ogóle w takiej jak ja mam ekstremalnej sytuacji, kiedy my jesteśmy cały czas razem, no to w ogóle to jest inaczej. Tu jest jeszcze to pytanie, czy to jest sytuacja?
00:14:22 Prelegent 2: Przez nią wybrana, czy ona została do tego zmuszona? Początek, gdzie jest tak dużo mówienia, że kiedyś było inaczej i tak dalej? Mimo tego, że ona tam te różne sytuacje związane z świętami opisuje tak jakby one były narzucone.
00:14:41 Prelegent 2: To jednak wydaje mi się ta ta ta ta ta sytuacja, jednak ją trochę boli i że ona nie chciałaby być sama.
00:14:51 Prelegent 2: Bo prawdę mówiąc jest chyba niewiele ludzi, którzy chcieliby być sami, są na pewno tacy, bo różne są zboczenia, że tak powiem, ale.
00:15:00 Prelegent 2: Ale większość z nas chyba nie chce być sama.
00:15:48 Prelegent 2: Zauważyłeś, że tu w ogóle nie ma nic o rodzinie?
00:15:52 Prelegent 2: Co ty mówi, że może z matką nie może rozmawiać i tak dalej, bo coś tam to tu w gruncie rzeczy nie. To jest twoja jakaś projekcja, bo tutaj nic nie ma.
00:15:52 Prelegent 2: Tutaj nawet w gruncie rzeczy, jeśli jest wspomniane o innych ludziach, do których mogłaby pójść.
00:16:11 Prelegent 2: To jest tak, jakby to byli znajomi, a nie rodzina.
00:16:17 Prelegent 2: Nie zadzwoni do nikogo, celowo wiedziała, że mogłaby, ale że mogłaby, ale nie chciała się tłumaczyć z nastroju, nie odpowiada na pytanie w rodzaju, dlaczego jesteś sama takie pytania, dlaczego jesteś sama to zadają znajomi albo przyjaciele.
00:16:28 Prelegent 2: Rodzina raczej nie tutaj w ogóle rodzina w tej historii nie ma.
00:16:39 Prelegent 2: Pojawiła.
00:17:07 Prelegent 2: Tu się rodzina pojawia tylko jako absolutnie obcy obraz. Obraz telewizji w telewizji leciał kolejny świąteczny film rodziny. Śmiech pojednania. Nie ma więcej, ona jest jakby wyobcowana bardziej niż.
00:17:21 Prelegent 2: Niż wielu ludzi.
00:17:28 Prelegent 2: No tak, bo ona nie chce odpowiadać na pytania żadne.
00:17:50 Prelegent 2: Ona nie chce takiej sytuacji, ale to ona ją spowodowała.
00:18:21 Prelegent 2: Takie ciekawostka, że wielu ludzi unika rozmów z innymi, bo właśnie nie chce tego, co my teraz robimy, czyli analizowania mówienia, co jest dobrze, co źle.
00:18:32 Prelegent 2: I tak dalej, bo my teraz jakby robimy, rozbieramy na czynniki pierwsze, co się z nią dzieje, nie mając tak naprawdę bladego pojęcia o niej, nie znając, nie wiemy.
00:18:42 Prelegent 2: Domyślając ja tak sobie myśląc po prostu.
00:18:51 Prelegent 2: To no więc z drugiej strony samotność ją na pewno boli. Nie jest wyborem takim.
00:19:01 Prelegent 2: Świadomym natomiast być może unikanie kontaktów jest już świadome, wynikające z tego, że ona po prostu nie chce być analizowana oceniana.
00:19:22 Prelegent 2: A to jest chyba też bardzo dzisiaj powszechne wśród młodych ludzi. Tak mi się wydaje.
00:19:27 Prelegent 2: Że ludzie, często młodzi ludzie unikają głębszych relacji, bo właśnie nie chcą być oceniani i to jest dla nich duży dyskomfort i może ona właśnie dlatego jest sama, bo nie chce odpowiadać na różnego rodzaju pytania. Nie chce, żeby ktoś na nią patrzył w jakiś szczególny sposób, jak jest sama.
00:19:43 Prelegent 2: To sama siebie tylko ocenia, albo przeżywa to co tam myśli, a jak już jest ktoś obok no to ktoś patrzy krzywo albo życzliwie, ale zawsze w jakiś sposób.
00:20:32 Prelegent 2: No tak kiedyś.
00:20:33 Prelegent 2: Tylko do tego co było.
00:20:34 Prelegent 2: Blisko i spotka na ulicy i zagada, czy tam do niej zagada, a teraz ona otwiera telefon i ma wszystko i przez to jak my tak i one.
00:21:44 Prelegent 2: Chyba mężczyźni też jednak zwracają uwagę na.
00:21:46 Prelegent 2: Zwracają uwagę, nie, mówię, jak wygląda bardzo zwracają, ale to dopiero na pierwszych początkach, to znaczy.
00:21:54 Prelegent 2: Na początku samym tak później.
00:21:56 Prelegent 2: W ogóle zainteresować to muszą.
00:21:59 Prelegent 2: Niestety.
00:22:42 Prelegent 2: Takich atomów, które sobie krążą?
00:22:58 Prelegent 2: Tak dokładnie.
00:23:21 Prelegent 2: Dobrze, nie wiem czworgiem ludzi.
00:23:50 Prelegent 2: Dobrze.
00:23:52 Prelegent 2: W świecie instagramu czy innych mediów społecznych to raczej są ludzie, powiedzmy młodsi ode mnie.
00:24:01 Prelegent 2: Jest taka ciekawostka, że tak naprawdę my nie wiemy ile lat ma ta kobieta, a to też nam jakby utrudnia.
00:24:10 Prelegent 2: Ocenę tej sytuacji.
00:24:17 Prelegent 2: A.
00:24:27 Prelegent 2: Jakby wyjechała córka tylko jej ten to by się tu pojawiło jakieś wspomnienia o niej tutaj nie ma w ogóle rodziny.
00:24:37 Prelegent 2: Nie wiemy dlaczego, dlaczego nikogo obok jej nie ma, tutaj nie ma.
00:24:41 Prelegent 2: Jest poczucie samotności, nie ma nic na temat przyczyn tej samotności.
00:24:48 Prelegent 2: I możemy chyba na tym zakończyć?
00:24:54 Prelegent 2: Koniec.
00:24:58 Prelegent 2: Za długo.
00:25:04 Prelegent 2: I co ty na to?`;

const raw_P1_N2 = `00:00:05 Prelegent 1: A chcesz tak?
00:00:07 Prelegent 1: Rozumiem tak po cichu przeczytam drugi raz.
00:00:12 Prelegent 1: To czytam.
00:00:15 Prelegent 1: Przeczytajcie właśnie historię, następnie porozmawiajcie ze sobą o tym, jak rozumiecie przeżycia bohaterki, jakie emocje według was odczuwa oraz co w jej sytuacji jest wam bliskie lub obce? Nie ma dobrych ani złych odpowiedzi. Ważne jest swobodne wyrażanie myśli i reakcji na treść historii.
00:00:33 Prelegent 1: Jakie emocje odczuwać os? Jej sytuacji jest bliskie owoce, ciche święta. W mieszkaniu pachniało mandarynkami, choć nikt ich specjalnie nie jadł. Stały w misce na stole bardziej jako znak, że to już ten czas niż realna potrzeba. Za oknem migotały świąteczne lampki sąsiadów...
00:03:52 Prelegent 1: U mnie jest to takie 50 na 50 z tą samotnością.
00:04:05 Prelegent 1: Czasem potrzebuję tej samotności, żeby odpocząć, żeby nikt do mnie nie mówił.
00:05:48 Prelegent 1: Wydaje mi się, że ona się pogodziła z tym, że jest sama, jest z tym pogodzona w jakiś sposób.
00:06:12 Prelegent 1: Święta kojarzą mi się z hałasem, a tu jest taka głucha cisza.
00:06:21 Prelegent 1: No jest jej smutno, jest trochę przygnębiająca z drugiej strony.
00:08:00 Prelegent 1: Wolałabym, żeby moje święta były z kimś, wolałabym, żeby było inaczej, ale wyszło tak jak wyszło.
00:08:25 Prelegent 1: W te święta czułam się sama, ale mniej samotna niż jak byłam z nim. To też jest ważne.
00:08:45 Prelegent 1: Ja bym chyba nie potrafił tak zupełnie sam siedzieć w Wigilię.
00:10:24 Prelegent 1: Trochę tak czułam, że nie było tej bliskiej osoby koło mnie, ale to było chwilowe.
00:11:03 Prelegent 1: No ja miałem taką sytuację, że byłem sam w święta, ale to było z wyboru, bo chciałem odpocząć od wszystkiego.
00:14:24 Prelegent 1: Ta pustka jest taka bardzo dotkliwa w te dni, kiedy wszyscy są razem, a ty jesteś sam przed telewizorem.
00:20:44 Prelegent 1: Ona się boi tej ciszy, bo wtedy musi myśleć o tym, czego jej brakuje.
00:21:08 Prelegent 1: Tak.
00:21:30 Prelegent 1: No nie, nie do końca potrafi nać.
00:21:55 Prelegent 1: No raczej raczej w tą stronę tam z taką no ucieczkę trochę to poszło ewidentnie nie czerpię, a przyjemność z tego, że jest singlem i nie potrafi się z tym.`;

const raw_P2_N2 = `00:00:06 Prelegent 2: Żeby możemy.
00:00:11 Prelegent 2: No dobra, to jak?
00:00:13 Prelegent 2: Dobra.
00:03:15 Prelegent 2: Dla mnie to jest bardzo obce, ja nigdy nie byłam sama w święta.
00:05:12 Prelegent 2: Na pewno ten wstyd jakiś taki związany z tym, że właśnie wszyscy wokół wiesz mają tą atmosferę rodzinną, a ona nie.
00:05:44 Prelegent 2: Przeraża mnie ta wizja, że nikt nie dzwoni i nie przychodzi w taki dzień.
00:07:20 Prelegent 2: To jest taka samotność wymuszona, ona udaje przed sobą, że jej to pasuje.
00:08:39 Prelegent 2: U mnie bardziej w kontekście takiej rodzinnej atmosfery niż partnerskiej.
00:08:58 Prelegent 2: Ja też jakby z wyboru nie kontaktuję się z mamą w pewnych sprawach.
00:10:33 Prelegent 2: Ja bym pewnie płakała w takiej sytuacji, to jest przytłaczające.
00:11:33 Prelegent 2: W sumie samotność nie jest taka zła, jeśli wiesz, że to tylko na chwilę.
00:15:15 Prelegent 2: Dla mnie najbardziej poruszające było to, że ona sprząta, żeby nie myśleć, żeby zabić ten czas.
00:21:07 Prelegent 2: Tylko łysieczka.
00:21:20 Prelegent 2: No to to jest trochę taka samotność niby z wyboru, ale jednak taka, że po prostu ona zaakceptowała to, ale to nie był jej wybór.
00:21:32 Prelegent 2: Sobie z tym poradzić też jakby nie właśnie tak jakby nie.
00:21:36 Prelegent 2: W tekście jest, że tak brzmi, że ona to zaakceptowana, ale jednak nie do końca, bo jeśli ona ucieka i tak dalej tylko no nie zmierzyła się z tym, nie to jest trochę takie, że no jest samotna i zaakceptowała, jest i zaakceptowała to, ale jest samotna, bo po prostu no to tak wyszło i ona to zaakceptowała, a nie, że to jej.`;

export const allTranscripts: Transcript[] = [
  {
    id: "N1_P1",
    label: "Nagranie 1 — Prelegent 1",
    lines: parseTranscript(raw_P1_N1),
  },
  {
    id: "N1_P2",
    label: "Nagranie 1 — Prelegent 2",
    lines: parseTranscript(raw_P2_N1),
  },
  {
    id: "N2_P1",
    label: "Nagranie 2 — Prelegent 1",
    lines: parseTranscript(raw_P1_N2),
  },
  {
    id: "N2_P2",
    label: "Nagranie 2 — Prelegent 2",
    lines: parseTranscript(raw_P2_N2),
  },
];
