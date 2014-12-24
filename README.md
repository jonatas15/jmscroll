jmscroll
========

j(m)scroll : Infinite Scrolling Plugin for jQuery / jQuery Mobile

A variation of Philip Klauzinski's excellent jscroll Plugin (<a href="http://jscroll.com">http://jscroll.com</a>). The only problem i had with it was that when jQuery Mobile was included jscroll was loading more than one page at initialization. Given that, and my need for a not fixed footer for social buttons, copyrights et al. i created a simpler version that loads next set of content when the user scrolls to the starting of the footer (or some predefined pxs above it). I would really like to know what breaks jscroll when jQuery Mobile is included. If you know the answer please share it with me. Unfortunately i don't have the time to find it myself.  

You can find a simple working example in the example/ folder. The parameters you can define are:

<table>
<tr>
 <td><b>debug</b></td>
 <td>TRUE or FALSE for logging in browser's console.</td>
</tr>
<tr>
 <td><b>autoTrigger</b></td>
 <td>TRUE or FALSE for loading automatically or by clicking a button.</td>
</tr>
<tr>
 <td><b>autoTriggerUntil</b></td>
 <td>After the defined number of pages -which will be triggered automatically- a button click will trigger the loading of next pages. This is the one of the two ways you have to reach document's footer.</td>
</tr>
<tr>
 <td><b>totalPages</b></td>
 <td>The other one is the totalPages limit which defines the maximum page number (auto or manually triggered).</td>
</tr>
<tr>
 <td><b>contentSelector</b></td>
 <td>Selector for loading only part(s) of the response.</td>
</tr>
<tr>
 <td><b>nextSelector</b></td>
 <td>Selector to find the link which contains the href pointing to the next set of content.</td>
</tr>
<tr>
 <td><b>footerSelector</b></td>
 <td>Self-explanatory: The footer selector.</td>
</tr>
<tr>
 <td><b>footerPadding</b></td>
 <td>The distance from the footer at which to trigger the loading of the next set of content.</td>
</tr>
<tr>
 <td><b>footerVisible</b></td>
 <td>Set this parameter to FALSE in order to hide footer while auto triggering.</td>
</tr>
<tr>
 <td><b>loadingContentDelay</b></td>
 <td>For testing purposes -or because you have a real fancy progress bar you want your visitors to see- you can define a delay (in milliseconds) to the Ajax response.</td>
</tr>
<tr>
 <td><b>progressType</b></td>
 <td>html | spinner | bar <i>[For Each Options There Are Extra Parameters] :</i></td>
</tr>
<tr>
 <td><b>progressType='html'</b></td>
 <td>
  <table>
   <tr>
    <td><b>loadingHtml</b></td>
    <td>HTML Markup to show while loading next (for example a loading .gif, though it is not a good idea due to poor mobile browser copatibility).</td>
   </tr>
  </table>
 </td>
</tr>
<tr>
 <td><b>progressType='spinner'</b></td>
 <td>
  <table>
   <tr>
   <td colspan="2">For better compatibility you can try fgnass' spin.js (http://fgnass.github.io/spin.js/). You can define all the available parameters following the names of fgnass prefixed with 'spinner' (camel case). For example:</td>
   </tr>
   <tr>
    <td><b>spinnerLines</b></td>
    <td>The number of lines to draw.</td>
   </tr>
   <tr>
    <td><b>spinnerLength</b></td>
    <td>The length of each line (in px).</td>
   </tr>
   <tr>
    <td><b>spinnerWidth</b></td>
    <td>The line thickness (in px).</td>
   </tr>
  </table>
 </td>
</tr>
<tr>
 <td><b>progressType='bar'</b></td>
 <td>
  <table>
   <tr>
    <td colspan="2">If none of the above suits your needs, you can go with the pure js progress bar: a span inside a full width div which is animated (in steps) to fill all the container.</td>
   </tr>
   <tr>
    <td><b>progressBarSpeed</b></td>
    <td>Milliseconds between each step of the animation. Old mobile browsers may have problems if you animate in many steps or too quickly. Use sparingly.</td>
   </tr>
  </table>
 </td>
</tr>
<tr>
 <td><b>callback</b></td>
 <td>Callback function to be called at the end of each page load.</td>
</tr>
</table>
