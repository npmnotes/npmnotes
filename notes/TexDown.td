# $\TeX$Down

npmnotes understands [TexDown](https://www.npmjs.com/package/texdown) 
(notes must have a .td extension).

This allows you to write math expressions like this

$$
F = G\frac{m_1 m_2}{r^2}
$$

and draw graphics like this

\begin{tikzpicture}

\foreach[count=\i] \s in {60,120,...,360}{
  \node[draw, circle](\i) at (\s:3) {$\i$};
}
\foreach \i in {1,...,6}{
  \foreach \j in {1,...,6}{
    \draw (\i) to[bend right] (\j);
  }
}

\end{tikzpicture}
