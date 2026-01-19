from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, HRFlowable
from reportlab.lib.enums import TA_CENTER
import tempfile
import html
import base64
import io

def create_pdf_base64(resume_text: str, cover_letter: str, portfolio_bio: str, user_name: str, user_email: str, target_role: str) -> str:
    """Generate PDF and return as base64 string."""
    
    buffer = io.BytesIO()
    
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=0.75*inch,
        leftMargin=0.75*inch,
        topMargin=0.75*inch,
        bottomMargin=0.75*inch
    )
    
    styles = getSampleStyleSheet()
    
    
    styles.add(ParagraphStyle(
        name='MainTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=HexColor('#1e40af'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='SubTitle',
        parent=styles['Normal'],
        fontSize=11,
        textColor=HexColor('#475569'),
        spaceAfter=20,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='SectionHeader',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=HexColor('#1e40af'),
        spaceBefore=16,
        spaceAfter=8,
        fontName='Helvetica-Bold'
    ))
    
    styles.add(ParagraphStyle(
        name='SimpleBodyText',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        spaceAfter=6,
        textColor=HexColor('#334155')
    ))
    
    styles.add(ParagraphStyle(
        name='PageTitle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=HexColor('#1e40af'),
        spaceAfter=16,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    ))
    
    story = []
    
    
    story.append(Paragraph(html.escape(user_name), styles['MainTitle']))
    story.append(Paragraph(f"{html.escape(user_email)} | {html.escape(target_role)}", styles['SubTitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cbd5e1'), spaceAfter=12))
    
    
    for line in resume_text.split('\n'):
        line = line.strip()
        if not line:
            story.append(Spacer(1, 6))
        elif line.startswith('###'):
            story.append(Paragraph(html.escape(line.replace('###', '').strip()), styles['SectionHeader']))
        elif line.startswith('##'):
            story.append(Paragraph(html.escape(line.replace('##', '').strip()), styles['SectionHeader']))
        elif line.startswith('#'):
            story.append(Paragraph(html.escape(line.replace('#', '').strip()), styles['SectionHeader']))
        elif line.startswith('-') or line.startswith('•'):
            bullet_text = line.lstrip('-•').strip()
            story.append(Paragraph(f"• {html.escape(bullet_text)}", styles['SimpleBodyText']))
        elif line.startswith('**') and line.endswith('**'):
            bold_text = line.strip('*')
            story.append(Paragraph(f"<b>{html.escape(bold_text)}</b>", styles['SimpleBodyText']))
        else:
            story.append(Paragraph(html.escape(line), styles['SimpleBodyText']))
    
    
    story.append(PageBreak())
    story.append(Paragraph("Cover Letter", styles['PageTitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cbd5e1'), spaceAfter=16))
    
    for line in cover_letter.split('\n'):
        line = line.strip()
        if not line:
            story.append(Spacer(1, 8))
        else:
            story.append(Paragraph(html.escape(line), styles['SimpleBodyText']))
    
    
    story.append(PageBreak())
    story.append(Paragraph("Portfolio Bio", styles['PageTitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cbd5e1'), spaceAfter=16))
    
    for line in portfolio_bio.split('\n'):
        line = line.strip()
        if not line:
            story.append(Spacer(1, 8))
        else:
            story.append(Paragraph(html.escape(line), styles['SimpleBodyText']))
    
    doc.build(story)
    
    
    pdf_bytes = buffer.getvalue()
    buffer.close()
    
    return base64.b64encode(pdf_bytes).decode('utf-8')
