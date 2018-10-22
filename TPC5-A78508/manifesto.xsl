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
            </head>
            <body>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="meta">
        <hr/>
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
        <hr/>
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
        <hr/>
        <p>
            <h1>Equipa</h1>
            <xsl:apply-templates/>
        </p>
        <hr/>
    </xsl:template>
    
    <xsl:template match="elemento">
        <xsl:value-of select="id"/> 
        :: 
        <xsl:value-of select="nome"/> 
        :: 
        <a href="mailto:{email}"><xsl:value-of select="email"/></a> 
        ::
        <a href="{website}">Website</a>
        <img url="{foto/@path}"/>
    </xsl:template>
    
    <xsl:template match="resumo">
        <hr/>
        <h1>Resumo</h1>
        <xsl:apply-templates/>
        <hr/>
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
        <hr/>
        <h1>Resultados</h1>
        <xsl:apply-templates/>
        <hr/>
    </xsl:template>
    
    <xsl:template match="resultado">
        <p>
            <a href="{./@path}"><xsl:value-of select="."/></a>
        </p>
    </xsl:template>
</xsl:stylesheet>