<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method ="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="manifesto">
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </head>
            <body>
                <div class="w3-bar w3-black">
                    <button class="w3-bar-item w3-button" onclick="openTopico('info')">Informação Geral</button>
                    <button class="w3-bar-item w3-button" onclick="openTopico('equipa')">Equipa</button>
                    <button class="w3-bar-item w3-button" onclick="openTopico('resumo')">Resumo</button>
                    <button class="w3-bar-item w3-button" onclick="openTopico('resultados')">Resultados</button>
                </div>
                <div class="w3-container">
                    <xsl:apply-templates/>
                </div>
            </body>
            <script language="javascript"><![CDATA[
            function openTopico(topicName) {
                var i;
                var x = document.getElementsByClassName("topico");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none"; 
                }
                document.getElementById(topicName).style.display = "block"; 
            }
            ]]></script>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <div id="info" class="topico">
            <p>
                <h1><xsl:value-of select="id"/></h1>
                <br/>
                <b>Título:</b> <xsl:value-of select="título"/>
                <br/>
                <b>Subtítulo:</b> <xsl:value-of select="subtítulo"/>
                <br/>
                <b>Data de Início:</b> <xsl:value-of select="dinício"/>
                <br/>
                <b>Data de Fim:</b> <xsl:value-of select="dfim"/>
                <xsl:apply-templates/>
            </p>
        </div>
    </xsl:template>
    
    <xsl:template match="id"></xsl:template>
    <xsl:template match="título"></xsl:template>
    <xsl:template match="subtítulo"></xsl:template>
    <xsl:template match="dinício"></xsl:template>
    <xsl:template match="dfim"></xsl:template>
    
    <xsl:template match="supervisor">
            <p>
                <b>Supervisor:</b>
                <a href="{website}">
                    <xsl:value-of select="nome"/>
                </a> ::
                <a href="mailto:{email}">
                    Enviar Correio
                </a>
            </p>
    </xsl:template>
    
    <xsl:template match="equipe">
        <div id="equipa" class="topico" style="display:none">
            <p>
                <h1>Equipa</h1>
                <div class="w3-container"> 
                    <table class="w3-table w3-striped">
                        <thead>
                            <tr class="w3-light-grey">
                                <th></th>
                                <th>Identificador</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Website</th>
                            </tr>
                        </thead>
                        <xsl:apply-templates/>
                    </table>
                </div>
            </p>    
        </div> 
    </xsl:template>
    
    <xsl:template match="elemento">
        <tr>
            <td style="vertical-align: middle"><img src="{foto/@path}" class="w3-image w3-circle" style="width:175px"/></td>
            <td style="vertical-align: middle"><xsl:value-of select="id"/></td>
            <td style="vertical-align: middle"><xsl:value-of select="nome"/></td>
            <td style="vertical-align: middle"><a href="mailto:{email}"><xsl:value-of select="email"/></a></td>
            <td style="vertical-align: middle"><a href="{website}">Website</a></td>
        </tr>
    </xsl:template>
    
    <xsl:template match="resumo">
        <div id="resumo" class="topico" style="display:none">
            <h1>Resumo</h1>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="para">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    
    <xsl:template match="b">
        <b>
            <xsl:apply-templates/>
        </b>
    </xsl:template>
    
    <xsl:template match="i">
        <i>
            <xsl:apply-templates/>
        </i>
    </xsl:template>
    
    <xsl:template match="resultados">
        <div id="resultados" class="topico" style="display:none">
            <h1>Resultados</h1>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    
    <xsl:template match="resultado">
        <p>
            <a href="{./@path}"><xsl:value-of select="."/></a>
        </p>
    </xsl:template>
</xsl:stylesheet>