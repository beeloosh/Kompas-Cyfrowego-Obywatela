import streamlit as st
import pandas as pd

@st.cache_data
def load_data():
    # Wczytanie bazy efektów uczenia się z pliku CSV
    return pd.read_csv('data/DCE-Planner-Database.csv')

def main():
    st.title("DCE Lesson Planner")
    st.write("Wybierz grupę wiekową i domenę, by zobaczyć odpowiednie efekty uczenia się.")

    data = load_data()

    age_groups = sorted(data['Age group'].unique())
    selected_age = st.selectbox("Grupa wiekowa:", age_groups)

    domains = sorted(data['Domain'].unique())
    selected_domain = st.selectbox("Domena tematyczna:", domains)

    filtered = data[(data['Age group'] == selected_age) & (data['Domain'] == selected_domain)]
    st.write(f"Znaleziono {len(filtered)} pozycji:")

    for idx, row in filtered.iterrows():
        st.markdown(f"**{row['ID']}** - {row['Learning outcomes']}")

if __name__ == "__main__":
    main()
