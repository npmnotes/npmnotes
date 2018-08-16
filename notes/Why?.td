# Why?

The motivation to build npmnotes came from this [discussion](https://goo.gl/te4BFv).

Some of the advantages are:

1. You have control over your notes, keep them locally or synchronize them the way you want
2. You ca use your favorite editor to write your notes and your favorite browser to read and search them.
3. Its an open-source tool. Need a missing feature? [tell me](https://github.com/npmnotes/npmnotes/issues) or [do it yourself](https://github.com/npmnotes/npmnotes).

Finally, npmnotes understands [TexDown](https://www.npmjs.com/package/texdown) 
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
