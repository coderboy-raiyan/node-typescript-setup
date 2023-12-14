<div id="the-content-container">
<div class="lr-content">

<style>
.arcade-close {margin-right: 5px;
    float: right;
    text-align: center;
    width: 100px;
    display: none;
    padding: 5px;
    border-radius: 3px 3px 0px 0px;
    background: #dfdfdf;
    opacity: .5;}
.arcade-close:hover {cursor: pointer;}
.arcade-container {width: 0px; height:0;transition: width 2s;margin-left:-100px;
}

#arcade-interstitial {
  border: 2px solid rgba(118, 74, 188, 0.2);
  border-radius: 8px;
  background-color: #491d90;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-family: 'Proxima Nova', sans-serif;
  margin-bottom: 30px;
  display:flex;
}

#arcade-interstitial img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}


#arcade-interstitial .text-container h2 {
  font-weight: 800;
  font-size: 22px;
  line-height: 22px;
  color: #fff;
  margin: 0 0 5px 0;
  width: 70%;
}
#arcade-interstitial .text-container {margin-left: 10px;}

#arcade-interstitial .text-container h3 {
  font-weight: 900;
  font-size: 13px;
  line-height: 13px;
  letter-spacing: 0.1em;
  color: #fff;
  opacity: 0.5;
  margin: 0;
  flex: none;
  order: 1;
  flex-grow: 0;
  white-space: nowrap;

}

#arcade-interstitial .arcade-cta-button {
  background-color: #fff;
  color: #764abc;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  font-weight: 800;
  font-family: 'Proxima Nova', sans-serif;
  text-decoration: none;
  width: 25%;
  text-align: center;
}

.arcade-cta-button:hover {
  text-decoration: none;
  color: #a58ec8;  
  cursor: pointer;
}

@media all and (min-width: 990px) and (max-width: 1200px) {.arcade-container {margin-left: -160px;}}
@media all and (max-width: 889px) {#arcade-interstitial {display:none;}}
</style>
</div>
<div class="article-post"></div>

<p><strong><em>Editor’s note:</em></strong> <em>This article was last updated on 26 September 2023 to provide information about the latest version of ESLint, v8.5 at the time of writing.</em></p>
<img fetchpriority="high" decoding="async" width="730" height="487" src="https://blog.logrocket.com/wp-content/uploads/2022/12/linting-typescript-eslint-prettier.png" class="attachment-full size-full wp-post-image" alt="Linting In TypeScript Using ESLint And Prettier" srcset="https://blog.logrocket.com/wp-content/uploads/2022/12/linting-typescript-eslint-prettier.png 730w, https://blog.logrocket.com/wp-content/uploads/2022/12/linting-typescript-eslint-prettier.png?resize=300,200 300w" sizes="(max-width: 730px) 100vw, 730px" data-attachment-id="179261" data-permalink="https://blog.logrocket.com/linting-typescript-eslint-prettier/attachment/linting-typescript-eslint-prettier-2/" data-orig-file="https://blog.logrocket.com/wp-content/uploads/2022/12/linting-typescript-eslint-prettier.png" data-orig-size="730,487" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="Linting in TypeScript using ESLint and Prettier" data-image-description="" data-image-caption="" data-medium-file="https://blog.logrocket.com/wp-content/uploads/2022/12/linting-typescript-eslint-prettier.png?w=300" data-large-file="https://blog.logrocket.com/wp-content/uploads/2022/12/linting-typescript-eslint-prettier.png?w=730"><p>As developers, we usually start a project by adding configurations and scripts for linting, then formatting and type checking for our codebase syntax and style.</p>
<p>This process is even more important when working on a team because everyone needs to be on the same page for codebase syntax and style. Also, to ensure that there are no typos or bugs when our app is in production, we should type check our code along the way.</p>
<p>Having a formatting tool, a linting tool, and TypeScript helps us automate this process. In this article, we’ll use <a href="https://eslint.org">ESLint</a> and <a href="https://www.typescriptlang.org">TypeScript</a>, and we’ll also see how to add Prettier and additional tooling that will automate this process for us.</p>
<p>To jump ahead:</p>
<ul>
<li><a href="#compiling-typescript-code">Compiling TypeScript code</a></li>
<li><a href="#what-linting">What is linting?</a></li>
<li><a href="#what-eslint">What is ESLint?</a></li>
<li><a href="#linting-eslint">Linting with ESLint</a></li>
<li><a href="#what-prettier">What is Prettier?</a></li>
<li><a href="#why-need-prettier-eslint">Why do we need Prettier with ESLint?</a></li>
<li><a href="#integrating-prettier">Integrating Prettier</a></li>
<li><a href="#avoiding-conflicts-working-eslint-prettier">Avoiding conflicts when working with ESLint and Prettier</a></li>
<li><a href="#eslint-vs-prettier">ESLint vs. Prettier</a></li>
</ul>
<p><em>N.B.,</em> There is a compatibility issue with specific versions of Node and the latest versions of ESLint and Prettier, so make sure you’re running a Node version &gt;= 16.0.0 when following the code sections later.</p>
<h2 id="compiling-typescript-code">Compiling TypeScript code</h2>
<p>Typescript is a superset of JavaScript that helps us with static type checking at compile time. TypeScript will give you a better development experience thanks to auto-completion in your editor. TypeScript also helps you maintain the code in your large codebases.</p>
<p>First, we need a compiler to turn TypeScript code into JavaScript so the browser can read it. Let’s install a dependency using your favorite package manager.</p>
<p>Head over to a suitable folder on your computer and run one of the following commands in your terminal:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="com">#npm</span><span class="pln">
npm install </span><span class="pun">--</span><span class="pln">save</span><span class="pun">-</span><span class="pln">dev typescript

</span><span class="com">#yarn</span><span class="pln">
yarn </span><span class="kwd">add</span><span class="pln"> typescript </span><span class="pun">--</span><span class="pln">dev</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Upon installation, you’ll see a new entry to the <code class=" prettyprinted" style=""><span class="pln">devDependencies</span></code> attribute of your <code class=" prettyprinted" style=""><span class="kwd">package</span><span class="pun">.</span><span class="pln">json</span></code> file as:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="pun">{</span><span class="pln">
  </span><span class="str">"name"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"Linting TypeScript with ESLint"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"version"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"1.0.0"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"devDependencies"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"typescript"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"^5.2.2"</span><span class="pln">
  </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>If you want to verify that it’s been installed, you can run this to check the version:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npx tsc </span><span class="pun">--</span><span class="pln">version
</span><span class="com"># Version 5.2.2</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>In your folder, create an <code class=" prettyprinted" style=""><span class="pln">index</span><span class="pun">.</span><span class="pln">ts</span></code> file in the <code class=" prettyprinted" style=""><span class="pln">src</span></code> directory and add the following TypeScript code:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="com">// src/index.ts</span><span class="pln">
</span><span class="kwd">const</span><span class="pln"> favoriteFruits</span><span class="pun">:</span><span class="pln"> string</span><span class="pun">[]</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[</span><span class="str">"apple"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"strawberry"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"orange"</span><span class="pun">];</span><span class="pln">

</span><span class="kwd">function</span><span class="pln"> addFruit</span><span class="pun">(</span><span class="pln">fruit</span><span class="pun">:</span><span class="pln"> string</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
  favoriteFruits</span><span class="pun">.</span><span class="pln">push</span><span class="pun">(</span><span class="pln">fruit</span><span class="pun">);</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>We can compile the TypeScript code to JavaScript by running the following command in the terminal:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="pln">npx tsc src</span><span class="pun">/</span><span class="pln">index</span><span class="pun">.</span><span class="pln">ts</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Right after that, we’ll see a newly generated JavaScript file in the same directory as the TypeScript file:</p>
<pre class="language-javascript hljs prettyprinted" style="position: relative;"><span class="com"><span class="hljs-comment">// src/index.js</span></span><span class="pln">
</span><span class="kwd"><span class="hljs-keyword">var</span></span><span class="pln"> favoriteFruits </span><span class="pun">=</span><span class="pln"> </span><span class="pun">[</span><span class="str"><span class="hljs-string">"apple"</span></span><span class="pun">,</span><span class="pln"> </span><span class="str"><span class="hljs-string">"strawberry"</span></span><span class="pun">,</span><span class="pln"> </span><span class="str"><span class="hljs-string">"orange"</span></span><span class="pun">];</span><span class="pln">

</span><span class="kwd"><span class="hljs-function"><span class="hljs-keyword">function</span></span></span><span class="pln"><span class="hljs-function"> <span class="hljs-title">addFruit</span></span></span><span class="pun"><span class="hljs-function">(</span></span><span class="pln"><span class="hljs-function"><span class="hljs-params">fruit</span></span></span><span class="pun"><span class="hljs-function">)</span></span><span class="pln"><span class="hljs-function"> </span></span><span class="pun">{</span><span class="pln">
    favoriteFruits</span><span class="pun">.</span><span class="pln">push</span><span class="pun">(</span><span class="pln">fruit</span><span class="pun">);</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>By default, the compiler will create JavaScript files side-by-side with the TypeScript source file that created it. This is not a good idea because you’ll end up mixing your build results with your source code.</p>
<p>So, let’s change some default compiler settings, starting from where we want to put our compiled code, which JavaScript level is targeted to be transpiled (by default: ECMAScript 3), and which files we want to compile.</p>
<p>There are two ways to create your TypeScript compiler settings:</p>
<ol>
<li>Run the following command in the terminal: <code class=" prettyprinted" style=""><span class="pln">npx tsc </span><span class="pun">--</span><span class="pln">init</span></code>. This will generate a default TypeScript configuration file</li>
<li>Create a file called <code class=" prettyprinted" style=""><span class="pln">tsconfig</span><span class="pun">.</span><span class="pln">json</span></code> at the root directory of your project and include your settings</li>
</ol>
<p>In this case, I’ll create the TypeScript compiler settings manually. However, I would encourage you to choose the first option. It will create the config file with some recommended options — all options are described with comments explaining what they do.</p>
<p>You can modify these settings as you need to. Check out the full <a href="https://www.typescriptlang.org/tsconfig">list of supported compiler options</a>, and you can play around in the <a href="https://www.typescriptlang.org/play">TypeScript playground</a>:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="com">// tsconfig.json</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str">"compilerOptions"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"outDir"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"dist"</span><span class="pun">,</span><span class="pln"> </span><span class="com">// where to put the compiled JS files</span><span class="pln">
    </span><span class="str">"target"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"ES2020"</span><span class="pun">,</span><span class="pln"> </span><span class="com">// which level of JS support to target</span><span class="pln">
    </span><span class="str">"module"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"CommonJS"</span><span class="pun">,</span><span class="pln"> </span><span class="com">// which system for the program AMD, UMD, System, CommonJS</span><span class="pln">

    </span><span class="com">// Recommended: Compiler complains about expressions implicitly typed as 'any'</span><span class="pln">
    </span><span class="str">"noImplicitAny"</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pun">,</span><span class="pln"> 
  </span><span class="pun">},</span><span class="pln">
  </span><span class="str">"include"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"src"</span><span class="pun">],</span><span class="pln"> </span><span class="com">// which files to compile</span><span class="pln">
  </span><span class="str">"exclude"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"node_modules"</span><span class="pun">],</span><span class="pln"> </span><span class="com">// which files to skip</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Congratulations! Now, you can start writing TypeScript and compiling it to JavaScript by running <code class=" prettyprinted" style=""><span class="pln">npx tsc</span></code>.</p>
<p>You can include the above command in your scripts to make it easier to run. Go to <code class=" prettyprinted" style=""><span class="kwd">package</span><span class="pun">.</span><span class="pln">json</span></code> and add the <code class=" prettyprinted" style=""><span class="pun">--</span><span class="pln">watch</span></code> flag to watch the files for changes. Keep in mind that everything that is described in <code class=" prettyprinted" style=""><span class="pln">compilerOptions</span></code> can be passed into the command line using CLI flags:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="com">// package.json</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str">"name"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"Linting TypeScript with ESLint"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"version"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"1.0.0"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"devDependencies"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"typescript"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"^4.9.4"</span><span class="pln">
  </span><span class="pun">},</span><span class="pln">
  </span><span class="str">"scripts"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"dev"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"tsc --watch"</span><span class="pln">
  </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<h2 id="what-linting">What is linting?</h2>
<p>Code linting is the automated analysis of source code to find and report programmatic and stylistic errors. It helps reduce errors, thereby improving the quality of code delivered. Code linting has numerous benefits, including error detection, enforcing best practices, and enforcing coding style amongst others.</p>
<p>Linting helps catch errors by performing syntax checks, checking code quality, and ensuring consistency in formatting style. It is advisable to use always in projects to enforce a coding style.</p><div class="code-block code-block-57" style="margin: 8px 0; clear: both;">
<hr>
<div style="display:block; margin-bottom: 20px;">
<a href="https://lp.logrocket.com/blg/learn-more" class="embed-link">
<div class="tweet-embed-container">
<div class="single-tweet">
<img src="https://blog.logrocket.com/wp-content/uploads/2023/07/Screen-Shot-2023-07-06-at-7.44.15-AM.png">
</div>
<div class="embed-tweet-right">
<h2>Over 200k developers use LogRocket to create better digital experiences</h2>
<div class="embed-btn"><img src="https://blog.logrocket.com/wp-content/uploads/2022/08/rocket-button-icon.png">Learn more →</div>
</div>
</div></a></div>
<hr>
<style>
@media all and (max-width: 800px){
    .tweet-embed-container {flex-direction: column !important;}
    .single-tweet, .embed-tweet-right {width: 100% !important;}
}
.embed-link {text-decoration: none;}
.embed-link:hover {text-decoration: none;}
.tweet-embed-container {border-radius: 20px;
  background: radial-gradient(79.69% 102.24% at 100% 100.11%, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)), radial-gradient(89.7% 115.09% at 3.43% 2.75%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0)), #764ABC;
background-blend-mode: overlay, overlay, normal;
  box-shadow: 0 4px 0 #d5d5d5;
  width: auto;
  padding: 20px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  gap: 3%;
}
.single-tweet {width: 50%;}
.single-tweet img {max-width: 100%;height: auto; border-radius:7px;}
.embed-tweet-right {width: 46%;}
.embed-tweet-right h2 {font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 28px;
color: #FFFFFF;}
.embed-btn {
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 170px;
  gap: 5px;
  align-items: center;
  padding: 0px 10px;
  font-family: 'Avenir';
font-style: normal;
font-weight: 900;
font-size: 16px;
line-height: 16px;
color: #764ABC;
height: 48px;
/* White */
background: #FFFFFF;
mix-blend-mode: normal;
box-shadow: 0px 24px 30px rgba(0, 0, 0, 0.11);
border-radius: 80px;
  border: none;
}</style></div>
<h2 id="what-eslint">What is ESLint?</h2>
<p>One of the most popular tools for linting is ESLint, which will analyze your code to find potential bugs and improve your code quality by defining coding conventions and then automatically enforcing them. Let’s see how to install ESLint into our TypeScript project.</p>
<p>First, install the following dependencies to your <code class=" prettyprinted" style=""><span class="pln">devDependencies</span></code>:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npm install eslint </span><span class="lit">@typescript</span><span class="pun">-</span><span class="pln">eslint</span><span class="pun">/</span><span class="pln">parser </span><span class="lit">@typescript</span><span class="pun">-</span><span class="pln">eslint</span><span class="pun">/</span><span class="pln">eslint</span><span class="pun">-</span><span class="pln">plugin </span><span class="pun">--</span><span class="pln">save</span><span class="pun">-</span><span class="pln">dev</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<ul>
<li><code class=" prettyprinted" style=""><span class="pln">eslint</span></code>: ESLint core library</li>
<li><code class=" prettyprinted" style=""><span class="lit">@typescript</span><span class="pun">-</span><span class="pln">eslint</span><span class="pun">/</span><span class="pln">parser</span></code>: A parser that allows ESLint to understand TypeScript code</li>
<li><code class=" prettyprinted" style=""><span class="lit">@typescript</span><span class="pun">-</span><span class="pln">eslint</span><span class="pun">/</span><span class="pln">eslint</span><span class="pun">-</span><span class="pln">plugin</span></code>: Plugin with a set of recommended TypeScript rules</li>
</ul>
<p>Similar to Typescript compiler settings, you can either use the command line to generate a configuration file using the <code class=" prettyprinted" style=""><span class="pun">--</span><span class="pln">init</span></code> flag from ESLint or create it manually. Either way, it’s mandatory to have your ESLint configuration file.</p>
<p>Let’s create a configuration file using the CLI. Run the following command in the terminal:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npx eslint </span><span class="pun">--</span><span class="pln">init</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Next, you will see a series of questions that allow you to adjust the configuration file based on your preferences:</p>
<ul>
<li>How would you like to use ESLint?</li>
<li>What type of modules does your project use?</li>
<li>Which framework does your project use?</li>
<li>Does your project use TypeScript?</li>
<li>Where does your code run?</li>
<li>How would you like to define a style for your project?</li>
</ul>
<p>Based on the options selected, the ESLint CLI will create a <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">eslintrc</span></code> configuration file in the project’s root directory with some default settings. If you already have your favorite settings, you can replace some of the options in the configuration file.</p>
<p>You can also explore the full list of <a href="https://eslint.org/docs/latest/user-guide/configuring/">ESLint settings available</a> for the configuration file.</p>
<h2 id="linting-eslint">Linting with ESLint</h2>
<p>For this article, replace the default settings in the configuration file with this:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="com">// .eslintrc</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str">"parser"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"@typescript-eslint/parser"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"parserOptions"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"ecmaVersion"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">12</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"sourceType"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"module"</span><span class="pln">
  </span><span class="pun">},</span><span class="pln">
  </span><span class="str">"plugins"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"@typescript-eslint"</span><span class="pun">],</span><span class="pln">
  </span><span class="str">"extends"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"eslint:recommended"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"plugin:@typescript-eslint/recommended"</span><span class="pun">],</span><span class="pln">
  </span><span class="str">"rules"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">

  </span><span class="pun">},</span><span class="pln">
  </span><span class="str">"env"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"browser"</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"es2021"</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pln">
  </span><span class="pun">},</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<ul>
<li><code class=" prettyprinted" style=""><span class="pln">parser</span></code>: This specifies a parser for ESLint to use when analyzing the code</li>
<li><code class=" prettyprinted" style=""><span class="pln">parserOptions</span></code>: Specifies what JS language options you want to support, such as the version of ECMAScript syntax you want to use</li>
<li><code class=" prettyprinted" style=""><span class="pln">plugins</span></code>: This is where you define plugins to use</li>
<li><code class=" prettyprinted" style=""><span class="kwd">extends</span></code>: Tells ESLint what configuration is set to extend from. The order matters as the last extend option will override the previous ones in any conflicting configurations</li>
<li><code class=" prettyprinted" style=""><span class="pln">env</span></code>: Specifies which environments your code will run in</li>
</ul>
<p>When we add an ESLint rule, it overrides the configuration defined in the <code class=" prettyprinted" style=""><span class="kwd">extends</span></code> list. Let’s add a couple of rules to see how it works:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="com">// .eslintrc</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str">"parser"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"@typescript-eslint/parser"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"parserOptions"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"ecmaVersion"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">12</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"sourceType"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"module"</span><span class="pun">,</span><span class="pln">
  </span><span class="pun">},</span><span class="pln">
  </span><span class="str">"plugins"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"@typescript-eslint"</span><span class="pun">],</span><span class="pln">
  </span><span class="str">"extends"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"eslint:recommended"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"plugin:@typescript-eslint/recommended"</span><span class="pun">],</span><span class="pln">

  </span><span class="str">"rules"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"@typescript-eslint/no-unused-vars"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"error"</span><span class="pun">,</span><span class="pln">
    </span><span class="com">// to enforce using type for object type definitions, can be type or interface </span><span class="pln">
    </span><span class="str">"@typescript-eslint/consistent-type-definitions"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"error"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"type"</span><span class="pun">],</span><span class="pln"> 
  </span><span class="pun">},</span><span class="pln">

  </span><span class="str">"env"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"browser"</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"es2021"</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pln">
  </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>In short, the first rule we apply is assigned to a value of <code class=" prettyprinted" style=""><span class="pln">error</span></code>, but <code class=" prettyprinted" style=""><span class="pln">error</span></code> is not the only value we can assign — we have three options:</p>
<ul>
<li><code class=" prettyprinted" style=""><span class="pln">off</span></code> or <code class=" prettyprinted" style=""><span class="lit">0</span></code>: Turn off the rule completely</li>
<li><code class=" prettyprinted" style=""><span class="pln">warn</span></code> or <code class=" prettyprinted" style=""><span class="lit">1</span></code>: Treat the rule as a warning, but it won’t fail when running a linter</li>
<li><code class=" prettyprinted" style=""><span class="pln">error</span></code> or <code class=" prettyprinted" style=""><span class="lit">2</span></code>: Treat the rule as an error. It will fail when running a linter</li>
</ul>
<p><em>N.B.</em>, In some ESLint rules, like the second rule, you would need to set additional options to use an array literal syntax.</p>
<p>You can tell ESLint to lint your code using the following command: <code class=" prettyprinted" style=""><span class="pln">eslint </span><span class="pun">--</span><span class="pln">ext </span><span class="pun">.</span><span class="pln">js</span><span class="pun">,.</span><span class="pln">ts</span></code>. The <code class=" prettyprinted" style=""><span class="pln">ext</span></code> flag is used to specify which file extensions ESLint should consider when searching for files in the target directory. In this case, we include TypeScript file extensions: <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">ts</span></code> (by default, it’s <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">js</span></code>)</p>
<p>Now you can add a <code class=" prettyprinted" style=""><span class="pln">lint</span></code> script into your <code class=" prettyprinted" style=""><span class="kwd">package</span><span class="pun">.</span><span class="pln">json</span></code> with the command above:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="com">// package.json</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str">"name"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"Linting TypeScript with ESLint"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"version"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"1.0.0"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"scripts"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"dev"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"tsc --watch"</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"lint"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"eslint --ext .js,.ts"</span><span class="pun">,</span><span class="pln">
  </span><span class="pun">},</span><span class="pln">
  </span><span class="str">"devDependencies"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"@typescript-eslint/eslint-plugin"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"^6.7.3"</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"@typescript-eslint/parser"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"^6.7.3"</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"eslint"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"^8.50.0"</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"typescript"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"^5.2.2"</span><span class="pln">
  </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>You’ll find that some files don’t need to be linted at all, such as your <code class=" prettyprinted" style=""><span class="pln">dist</span></code> folder, so you can prevent linting by creating a <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">eslintignore</span></code> file and adding the folders or files you want to ignore:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">node_modules
dist</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>This often matches with your <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">gitignore</span></code> file content, so to have a single source of truth, you can update the <code class=" prettyprinted" style=""><span class="pln">lint</span></code> script to use the <code class=" prettyprinted" style=""><span class="pun">--</span><span class="pln">ignore</span><span class="pun">-</span><span class="pln">path</span></code> flag:</p>
<pre class="language-javascript hljs prettyprinted" style="position: relative;"><span class="com"><span class="hljs-comment">// package.json</span></span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="com"><span class="hljs-comment">// ...</span></span><span class="pln">
  </span><span class="str"><span class="hljs-string">"scripts"</span></span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str"><span class="hljs-string">"lint"</span></span><span class="pun">:</span><span class="pln"> </span><span class="str"><span class="hljs-string">"eslint --ignore-path .eslintignore --ext .js,.ts ."</span></span><span class="pln">
   </span><span class="pun">},</span><span class="pln">
  </span><span class="com"><span class="hljs-comment">// ...</span></span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Now you’re ready to go! I suggest you integrate ESLint into whatever editor you use. If that’s VSCode, go to the extension and install the <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint extension</a>.</p>
<p>Once you’ve installed and enabled it, you’ll see what errors you’ve made in your code without running the script that is underlined with a red line.</p>
<p>You’ll see that the ESLint error message is printed inline in the editor; that’s another extension called <a href="https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens">Error Lens</a>, which highlights the entire line and shows the error message immediately instead of hovering with the pointer to see it:</p>
<p><img decoding="async" src="https://blog.logrocket.com/wp-content/uploads/2021/10/eslint-error-message-1.gif" alt="ESLint Error Message"></p>
<p>Another feature of ESLint is that it can automatically fix code when you hover and right-click <code class=" prettyprinted" style=""><span class="typ">Quick</span><span class="pln"> fix</span></code>, or you can hit <code class=" prettyprinted" style=""><span class="pln">command</span></code> and <code class=" prettyprinted" style=""><span class="pun">+</span></code>:</p>
<p><img decoding="async" src="https://blog.logrocket.com/wp-content/uploads/2021/10/eslint-quick-fix.gif" alt="ESLint Quick Fix"></p>
<p>Manually fixing all of the errors that have broken your rules can be tedious, but you can run the following command that will tell ESLint to fix what it can:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npm run lint </span><span class="pun">--</span><span class="pln">fix</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p><em>Tip</em>: You can pass parameters using double dashes <code class=" prettyprinted" style=""><span class="pun">--</span></code> for <code class=" prettyprinted" style=""><span class="pln">npm</span></code> scripts, which will be received as parameters for the script that <code class=" prettyprinted" style=""><span class="pln">npm</span></code> executes:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npm run </span><span class="str">&lt;command&gt;</span><span class="pln"> </span><span class="pun">[--</span><span class="pln"> </span><span class="str">&lt;args&gt;</span><span class="pun">]</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<h2 id="what-prettier">What is Prettier?</h2>
<p>Prettier is a well-known code formatter that supports a variety of different programming languages. It helps us avoid manually formatting our code by automatically formatting it based on a specified code style.</p>
<p>Nowadays, it’s common to use ESLint and Prettier together, and we will learn how to integrate Prettier with ESLint. First, let’s look at the difference between both and why they can be beneficial together.</p>
<h2 id="why-need-prettier-eslint">Why do we need Prettier with ESLint?</h2>
<p>The primary function of a linter is to improve your code by analyzing it and alerting you to any potential issues based on customizable or pre-defined rulesets. These rulesets, or rules, allow development teams to maintain a consistent coding style and identify potential bugs caused by inconsistent coding styles.</p>
<p>On the other hand, a code formatter like Prettier ensures a consistent style by parsing your code and re-printing it according to its rules. For example, you can specify a style that all JavaScript statements must end with a semicolon; the code formatter will automatically add the semicolon to all statements without one.</p>
<p>In essence, you can use ESLint to specify rulesets that must be adhered to and then use Prettier to fix cases in your code where these rulesets are broken.</p>
<h2 id="integrating-prettier">Integrating Prettier</h2>
<p>With that covered, let’s add Prettier to our project. Run the following command in the terminal:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npm install </span><span class="pun">--</span><span class="pln">save</span><span class="pun">-</span><span class="pln">dev prettier</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Compared to ESLint, Prettier doesn’t need a config file, meaning you can run and use it straight away. However, if you want to set a config, you will need to create a file called <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">prettierrc</span><span class="pun">.</span><span class="pln">json</span></code> in the project’s root directory, where you can define your format options.</p>
<p>You can take a look at the <a href="https://prettier.io/docs/en/options.html">full list of format options</a> and play around in the <a href="https://prettier.io/playground/">Prettier Playground</a>:</p>
<pre class="language-javascript hljs prettyprinted" style="position: relative;"><span class="com"><span class="hljs-comment">// .prettierrc.json</span></span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str"><span class="hljs-string">"semi"</span></span><span class="pun">:</span><span class="pln"> </span><span class="kwd"><span class="hljs-literal">false</span></span><span class="pun">,</span><span class="pln"> </span><span class="com"><span class="hljs-comment">// Specify if you want to print semicolons at the end of statements</span></span><span class="pln">
  </span><span class="str"><span class="hljs-string">"singleQuote"</span></span><span class="pun">:</span><span class="pln"> </span><span class="kwd"><span class="hljs-literal">true</span></span><span class="pun">,</span><span class="pln"> </span><span class="com"><span class="hljs-comment">// If you want to use single quotes</span></span><span class="pln">
  </span><span class="str"><span class="hljs-string">"arrowParens"</span></span><span class="pun">:</span><span class="pln"> </span><span class="str"><span class="hljs-string">"avoid"</span></span><span class="pun">,</span><span class="pln"> </span><span class="com"><span class="hljs-comment">// Include parenthesis around a sole arrow function parameter</span></span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Next, we are going to start formatting our code using Prettier in the command line:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npx prettier </span><span class="pun">--</span><span class="pln">write src</span><span class="pun">/</span><span class="pln">index</span><span class="pun">.</span><span class="pln">ts
</span><span class="com"># src/index.ts 37ms</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>I added a <code class=" prettyprinted" style=""><span class="pln">write</span></code> flag to overwrite the TypeScript file, otherwise, it won’t overwrite it and will only log the formatted code in your CLI.</p>
<p>Let’s add the Prettier command to our scripts, just as we did for TypeScript and ESLint. Let’s also support all files that end in <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">ts</span></code>, <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">js</span></code>, and <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">json</span></code>, and ignore the same files and directories as <code class=" prettyprinted" style=""><span class="pln">gitignore</span></code> (or you can create a <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">prettierignore</span></code> file):</p>
<pre class="language-javascript hljs prettyprinted" style="position: relative;"><span class="com"><span class="hljs-comment">// package.json</span></span><span class="pln">

</span><span class="pun">{</span><span class="pln">
  </span><span class="com"><span class="hljs-comment">// ...</span></span><span class="pln">
  </span><span class="str"><span class="hljs-string">"scripts"</span></span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str"><span class="hljs-string">"dev"</span></span><span class="pun">:</span><span class="pln"> </span><span class="str"><span class="hljs-string">"tsc --watch"</span></span><span class="pun">,</span><span class="pln">
    </span><span class="str"><span class="hljs-string">"lint"</span></span><span class="pun">:</span><span class="pln"> </span><span class="str"><span class="hljs-string">"eslint --ext .js,.ts ."</span></span><span class="pun">,</span><span class="pln">
    </span><span class="str"><span class="hljs-string">"format"</span></span><span class="pun">:</span><span class="pln"> </span><span class="str"><span class="hljs-string">"prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\""</span></span><span class="pln">
  </span><span class="pun">},</span><span class="pln">
  </span><span class="com"><span class="hljs-comment">// ...</span></span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>Now, you can run the <code class=" prettyprinted" style=""><span class="pln">npm run format</span></code> command to format and fix all your code. But what if we would like to format the code right after saving your files?</p>
<p>That’s possible! In VSCode, go to the <code class=" prettyprinted" style=""><span class="pln">extensions</span></code> tab, look for the <code class=" prettyprinted" style=""><span class="typ">Prettier</span></code> extension, and ensure it’s enabled. Once enabled, we need to configure a few things in VSCode.</p>
<p>You can open your command palette (<code class=" prettyprinted" style=""><span class="typ">Command</span></code> + <code class=" prettyprinted" style=""><span class="typ">Shift</span></code> + <code class=" prettyprinted" style=""><span class="pln">P</span></code>) and look for <code class=" prettyprinted" style=""><span class="typ">Preferences</span><span class="pun">:</span><span class="pln"> </span><span class="typ">Open</span><span class="pln"> </span><span class="typ">User</span><span class="pln"> </span><span class="typ">Settings</span><span class="pln"> </span><span class="pun">(</span><span class="pln">JSON</span><span class="pun">)</span></code>. Then you’ll need to change your editor’s default formatter and add an extra config to format code when you save your files:</p>
<pre class="language-javascript hljs prettyprinted" style="position: relative;"><span class="com"><span class="hljs-comment">// settings.json</span></span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str"><span class="hljs-string">"editor.defaultFormatter"</span></span><span class="pun">:</span><span class="pln"> </span><span class="str"><span class="hljs-string">"esbenp.prettier-vscode"</span></span><span class="pun">,</span><span class="pln">
  </span><span class="str"><span class="hljs-string">"editor.formatOnSave"</span></span><span class="pun">:</span><span class="pln"> </span><span class="kwd"><span class="hljs-literal">true</span></span><span class="pun">,</span><span class="pln">
  </span><span class="pun">...</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p><img decoding="async" src="https://blog.logrocket.com/wp-content/uploads/2021/10/preview-prettier-extension.gif" alt="Preview Prettier Extension"></p>
<h2 id="avoiding-conflicts-working-eslint-prettier">Avoiding conflicts when working with ESLint and Prettier</h2>
<p>You’ll likely run into an issue when a Prettier and ESLint rule overlap. You can try to auto-format your code, but it will show you some conflicts with ESLint.</p>
<p>The best solution here is to use the <code class=" prettyprinted" style=""><a href="https://github.com/prettier/eslint-config-prettier"><span class="pln">eslint</span><span class="pun">-</span><span class="pln">config</span><span class="pun">-</span><span class="pln">prettier</span></a></code> plugin to disable all ESLint rules that are irrelevant to code formatting, as Prettier is already good at it:</p>
<pre class="language-yarn hljs prettyprinted" style="position: relative;"><span class="pln">npm install </span><span class="pun">--</span><span class="pln">save</span><span class="pun">-</span><span class="pln">dev eslint</span><span class="pun">-</span><span class="pln">config</span><span class="pun">-</span><span class="pln">prettier</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>With that installed, let’s go to the <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">eslintrc</span></code> file, and add <code class=" prettyprinted" style=""><span class="pln">prettier</span></code> at the end of your extends list to disable any other previous rules from other plugins:</p>
<pre class="language-typescript hljs prettyprinted" style="position: relative;"><span class="com">// .eslintrc</span><span class="pln">
</span><span class="pun">{</span><span class="pln">
  </span><span class="str">"parser"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"@typescript-eslint/parser"</span><span class="pun">,</span><span class="pln">
  </span><span class="str">"parserOptions"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"ecmaVersion"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">12</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"sourceType"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"module"</span><span class="pun">,</span><span class="pln">
  </span><span class="pun">},</span><span class="pln">
  </span><span class="str">"plugins"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"@typescript-eslint"</span><span class="pun">],</span><span class="pln">
  </span><span class="com">// HERE</span><span class="pln">
  </span><span class="str">"extends"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"eslint:recommended"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"plugin:@typescript-eslint/recommended"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"prettier"</span><span class="pun">],</span><span class="pln">

  </span><span class="str">"rules"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"@typescript-eslint/no-unused-vars"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"error"</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"@typescript-eslint/consistent-type-definitions"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="str">"error"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"type"</span><span class="pun">],</span><span class="pln">
  </span><span class="pun">},</span><span class="pln">

  </span><span class="str">"env"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln">
    </span><span class="str">"browser"</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"es2021"</span><span class="pun">:</span><span class="pln"> </span><span class="kwd">true</span><span class="pln">
  </span><span class="pun">}</span><span class="pln">
</span><span class="pun">}</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper"></div></pre>
<p>That’s it! Now you know how to use these static testing tools effectively. It’s great to have some automation for specific tasks like linting, formatting, and type checking.</p>
<h2 id="eslint-vs-prettier">ESLint vs. Prettier</h2>
<p>Below is a general comparison of the key differences and purposes that ESLint and Prettier serve:</p>
<table>
<thead>
<tr>
<th></th>
<th>ESLint</th>
<th>Prettier</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nature</td>
<td>ESLint is a static code analysis tool and linter for JavaScript</td>
<td>Prettier is a code formatter, primarily focused on formatting code to make it more readable and consistent</td>
</tr>
<tr>
<td>Purpose</td>
<td>Code quality and bug detection</td>
<td>Code formatting</td>
</tr>
<tr>
<td>Configuration</td>
<td>Highly configurable, rules can be defined in a <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">eslintrc</span></code> config file</td>
<td>Less configurable, as it enforces a specific set of rules without configuration. But you can still configure some options in a <code class=" prettyprinted" style=""><span class="pun">.</span><span class="pln">prettierrc</span><span class="pun">.</span><span class="pln">json</span></code> config file</td>
</tr>
<tr>
<td>Integration</td>
<td>Can be integrated with popular IDEs to provide realtime feedback and auto-fixing capabilities</td>
<td>Can be integrated with popular IDEs to format files on save to fix formatting issues</td>
</tr>
</tbody>
</table>
<p>In summary, ESLint and Prettier serve distinct purposes in JavaScript development. While ESLint focuses on enforcing coding standards and patterns, detecting code quality issues, and identifying bugs, Prettier focuses on automatically formatting code to maintain consistency.</p>
<p>To learn more about linting in Typescript, check out this video:</p>
