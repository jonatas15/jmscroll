jmscroll
========

j(m)scroll : Infinite Scrolling Plugin for jQuery / jQuery Mobile

A variation of Philip Klauzinski's excellent jscroll Plugin (<a href="http://jscroll.com">http://jscroll.com</a>). The only problem i had with it was that when jQuery Mobile was included jscroll was loading more than one page at initialization. Given that, and my need for a not fixed footer for social buttons, copyrights et al. i created a simpler version that loads next set of content when the user scrolls to the starting of the footer (or some predefined pxs above it). I would really like to know what breaks jscroll when jQuery Mobile is included. If you know the answer please share it with me. Unfortunately i don't have the time to find it myself.  

You can find a simple working example in the example/ folder. The parameters you can define are:

<b>autoTrigger</b>: TRUE or FALSE for loading automatically or by clicking a button<br />
<b>maxPages</b>: If you want to reach document's footer it's wise to define a maximum number of pages<br />
<b>contentSelector</b>: Selector for loading only part(s) of the response<br />
<b>nextSelector</b>: Selector to find the link which contains the href pointing to the next set of content<br />
<b>footerSelector</b>: Footer selector<br />
<b>footerPadding</b>: The distance from the footer at which to trigger the loading of the next set of content<br />
<b>loadingContentDelay</b>: For testing purposes -or because you have a real fancy progress bar you want your visitors to see- you can define a delay (in milliseconds) to the Ajax response<br />
<b>progressBarSpeed</b>: While loading (at least for loadingContentDelay milliseconds) a jQuery progress bar is shown with it's width animated in 100 steps every progressBarSpeed milliseconds<br /> 
<b>callback</b>: callback to be called at the end of each page load<br />
