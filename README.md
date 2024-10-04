# En Minimalistisk Markdown Editor Med JS Parser och Purify

Grundtanken var från början att skapa något som var baserat på PHP då jag haft en sådan uppsättning tidigare.
GitHub är ingen PHP-webbserver och därav fick jag "tänka om lite".

**Mitt mål**
Gör ett HTML dokument och lägg till *<script>* taggar. Gör HTML dokumentet så kort och koncist som möjligt.
Jag ville att antalet kb på disk totalt skulle hållas under 100kb, det var mitt mål samtidigt som inga externa bibliotek används.
Ska något laddas? Ladda det lokalt.

Efter att ha arbetat en del med PHP som parser valde jag att titta på olika metoder då parsern är en sak för sig.
Därav tanken om att inte enbart konvertera (MD > HTML) utan också att undvika eventuella problem med skadlig kod.
Valet för parser samt för purify föll då på två JavaSript filer (som jag allteftersom modifierade).

## JavaScript Parser och Purify

Efter att ha gått igenom några av de mest erkända biblioteken valde jag att basera min parser på *markedjs* samtidigt som jag modifierade den en hel del.
Samma sak gjorde jag med *purify* filen.

## Förklaringar

**Sanering:**
När du skriver Markdown konverteras den till HTML. Innan HTML visas i förhandsgranskningen så bearbetar purify all kod och tar bort allt som kan vara skadligt.
Detta inkluderar skript och andra osäkra attribut.

Purify tillåter bara de HTML-taggar och attribut som anses säkra. Som utvecklare kan man naturligtvis ändra på detta, lägga till eller ta bort funktionalitet - osv.
Detta är och blir särskilt viktigt i en Markdown-redigerare då den som skriver kan försöka inkludera anpassad HTML, varav man bör vara försiktig med vad som accepteras.

Min *purify* version är definierad så att enbart en viss uppsättning av tillåtna taggar accepteras *(fler är tillåtna, detta är menat som ett exempel)*: **<strong>**, **<em>**, **<a>**.

**Prestanda:**
All HTML som genereras från Markdown saneras i realtid, vilket ger omedelbar feedback till den som skriver samtidigt som säkerheten bibehålls.
