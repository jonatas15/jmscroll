jmscroll
========

j(m)scroll : Infinite Scrolling Plugin for jQuery / jQuery Mobile

A variation of Philip Klauzinski's excellent jscroll Plugin (<a href="http://jscroll.com">http://jscroll.com</a>). The only problem i had with it was that when jQuery Mobile was included jscroll was loading more than one page at initialization. Given that, and my need for a not fixed footer for social buttons, copyrights et al. i created a simpler version that loads next set of content when the user scrolls to the starting of the footer (or some predefined pxs above it). I would really like to know what breaks jscroll when jQuery Mobile is included. If you know the answer please share it with me. Unfortunately i don't have the time to find it myself.  

You can find a simple working example in the example/ folder. The parameters you can define are:

<table>
<tr><td><b>a1</b></td><td>a2</td></tr>
</table>

<ul>
<li><b>debug</b>: TRUE or FALSE for logging in browser's console</li>
<li><b>autoTrigger</b>: TRUE or FALSE for loading automatically or by clicking a button</li>
<li><b>autoTriggerUntil</b>: After the defined number of pages -which will be triggered automatically- a button click will be needed to load more pages. It's one of the 2 ways you have to reach document's footer.</li>
<li><b>totalPages</b>: The other one is the totalPages limit which defines the maximum page number (auto or manually triggered)</li>
<li><b>contentSelector</b>: Selector for loading only part(s) of the response</li>
<li><b>nextSelector</b>: Selector to find the link which contains the href pointing to the next set of content</li>
<li><b>footerSelector</b>: Footer selector</li>
<li><b>footerPadding</b>: The distance from the footer at which to trigger the loading of the next set of content</li>
<li><b>loadingContentDelay</b>: For testing purposes -or because you have a real fancy progress bar you want your visitors to see- you can define a delay (in milliseconds) to the Ajax response</li>
<li><b>progressBarSpeed</b>: While loading (at least for loadingContentDelay milliseconds) a jQuery progress bar is shown with it's width getting animated every progressBarSpeed milliseconds</li>
<li><b>callback</b>: callback to be called at the end of each page load</li>
</ul>
